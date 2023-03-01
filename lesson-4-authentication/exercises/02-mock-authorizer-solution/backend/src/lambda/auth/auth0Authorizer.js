export async function handler(event) {
  try {
    verifyToken(event.authorizationToken)
    console.log('User was authorized')

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User was not authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader) {
  if (!authHeader) throw new Error('No authorization header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authorization header')

  const split = authHeader.split(' ')
  const token = split[1]

  if (token !== 'secret') {
    throw new Error('Invalid token')
  }

  // A request has been authorized. No need to do anything
}
