import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import AWSXRay from 'aws-xray-sdk-core'
import { v4 as uuidv4 } from 'uuid'

const dynamoDb = AWSXRay.captureAWSv3Client(new DynamoDB())
const dynamoDbClient = DynamoDBDocument.from(dynamoDb)
const s3Client = new S3Client()

const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)

export async function handler(event) {
  console.log('Caller event', event)
  const groupId = event.pathParameters.groupId
  const validGroupId = await groupExists(groupId)

  if (!validGroupId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }

  const imageId = uuidv4()
  const newItem = await createImage(groupId, imageId, event)

  const url = await getUploadUrl(imageId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}

async function groupExists(groupId) {
  const result = await dynamoDbClient.get({
    TableName: groupsTable,
    Key: {
      id: groupId
    }
  })

  console.log('Get group: ', result)
  return !!result.Item
}

async function createImage(groupId, imageId, event) {
  const timestamp = new Date().toISOString()
  const newImage = JSON.parse(event.body)

  const newItem = {
    groupId,
    timestamp,
    imageId,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`,
    ...newImage
  }
  console.log('Storing new item: ', newItem)

  await dynamoDbClient.put({
    TableName: imagesTable,
    Item: newItem,
  })

  return newItem
}

async function getUploadUrl(imageId) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: imageId
  })
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: urlExpiration
  })
  return url
}
