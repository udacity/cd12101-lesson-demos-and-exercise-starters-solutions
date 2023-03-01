import {
  CloudWatchClient,
  PutMetricDataCommand
} from '@aws-sdk/client-cloudwatch'
import axios from 'axios'

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new CloudWatchClient()

export async function handler(event) {
  // TODO: Use these variables to record metric values
  let endTime
  let requestWasSuccessful

  const startTime = timeInMs()
  await axios.get(url)

  //   const command = new PutMetricDataCommand({
  //     MetricData: [
  //       {
  //         MetricName: 'MetricName', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
  //         Dimensions: [
  //           {
  //             Name: 'ServiceName',
  //             Value: serviceName
  //           }
  //         ],
  //         Unit: '', // 'Count' or 'Milliseconds'
  //         Value: 0 // Total value
  //       }
  //     ],
  //     Namespace: 'Udacity/Serveless'
  //   });
  //   await cloudwatch.send(command);

  // TODO: Record time it took to get a response
  // TODO: Record if a response was successful or not
}

function timeInMs() {
  return new Date().getTime()
}
