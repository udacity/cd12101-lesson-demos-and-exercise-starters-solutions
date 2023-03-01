import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'

const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Caller event', event)
    const groupId = event.pathParameters.groupId

    const validGroupId = await groupExists(groupId)

    if (!validGroupId) {
      throw createError(
        404,
        JSON.stringify({
          error: 'Group does not exist'
        })
      )
    }

    const images = await getImagesPerGroup(groupId)

    return {
      statusCode: 201,
      body: JSON.stringify({
        items: images
      })
    }
  })

async function groupExists(groupId) {
  const result = await dynamoDbDocument.get({
    TableName: groupsTable,
    Key: {
      id: groupId
    }
  })

  console.log('Get group: ', result)
  return !!result.Item
}

async function getImagesPerGroup(groupId) {
  const result = await dynamoDbDocument.query({
    TableName: imagesTable,
    KeyConditionExpression: 'groupId = :groupId',
    ExpressionAttributeValues: {
      ':groupId': groupId
    },
    ScanIndexForward: false
  })

  return result.Items
}
