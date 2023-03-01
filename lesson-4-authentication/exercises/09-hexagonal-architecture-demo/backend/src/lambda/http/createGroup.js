import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../auth/utils.mjs'
import { createGroup } from '../../businessLogic/groups.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const newGroup = JSON.parse(event.body)

    const authorization = event.headers.Authorization
    const userId = getUserId(authorization)

    const newItem = await createGroup(newGroup, userId)

    return {
      statusCode: 201,
     body: JSON.stringify({
        newItem
      })
    }
  })