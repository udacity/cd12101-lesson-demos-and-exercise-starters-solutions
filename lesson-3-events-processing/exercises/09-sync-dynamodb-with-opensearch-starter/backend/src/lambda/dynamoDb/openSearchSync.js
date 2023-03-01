import { Client } from '@opensearch-project/opensearch'
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import createAwsOpensearchConnector from 'aws-opensearch-connector'

const osHost = process.env.OS_ENDPOINT

const getClient = async () => {
  const awsCredentials = await defaultProvider()()
  const connector = createAwsOpensearchConnector({
    credentials: awsCredentials,
    region: process.env.AWS_REGION ?? 'us-east-1',
    getCredentials: function (cb) {
      return cb()
    }
  })
  return new Client({
    ...connector,
    node: `https://${osHost}`
  })
}

export async function handler(event) {
  for (const record of event.Records) {
    console.log('Processing record', JSON.stringify(record))
  }
}
