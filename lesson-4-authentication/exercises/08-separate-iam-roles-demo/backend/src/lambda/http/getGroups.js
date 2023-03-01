import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const scanCommand = {
      TableName: groupsTable
    }
    const result = await dynamoDbClient.scan(scanCommand)
    const items = result.Items

    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  })
