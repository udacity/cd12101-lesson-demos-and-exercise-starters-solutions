import {
  CloudWatchClient,
  PutMetricDataCommand
} from '@aws-sdk/client-cloudwatch'
import axios from 'axios'

// Name of a service
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new CloudWatchClient()

export async function handler(event) {
  let endTime
  let requestWasSuccessful

  const startTime = timeInMs()

  try {
    await axios.get(url)
    requestWasSuccessful = true
  } catch (e) {
    requestWasSuccessful = false
  } finally {
    endTime = timeInMs()
  }

  const totalTime = endTime - startTime

  const successMetricCommand = new PutMetricDataCommand({
    MetricData: [
      {
        MetricName: 'Success',
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Count',
        Value: requestWasSuccessful ? 1 : 0
      }
    ],
    Namespace: 'Udacity/Serveless'
  })
  await cloudwatch.send(successMetricCommand)

  const latencyMetricCommand = new PutMetricDataCommand({
    MetricData: [
      {
        MetricName: 'Latency',
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Milliseconds',
        Value: totalTime
      }
    ],
    Namespace: 'Udacity/Serveless'
  })
  await cloudwatch.send(latencyMetricCommand)
}

function timeInMs() {
  return new Date().getTime()
}
