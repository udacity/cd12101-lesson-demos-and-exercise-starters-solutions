import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())
const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE

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

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem: newItem
    })
  }
}

async function groupExists(groupId) {
  const result = await dynamoDbClient
    .get({
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
    ...newImage
  }
  console.log('Storing new item: ', newItem)

  await dynamoDbClient
    .put({
      TableName: imagesTable,
      Item: newItem
    })

  return newItem
}
