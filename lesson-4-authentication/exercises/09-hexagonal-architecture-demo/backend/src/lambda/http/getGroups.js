// import { DynamoDB } from '@aws-sdk/client-dynamodb'
// import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getAllGroups } from '../../businessLogic/groups.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const groups = await getAllGroups()

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: groups
      })
    }
  })

