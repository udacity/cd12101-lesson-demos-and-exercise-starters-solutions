import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class GroupAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    groupsTable = process.env.GROUPS_TABLE
  ) {
    this.documentClient = documentClient
    this.groupsTable = groupsTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
  }

  async getAllGroups() {
    console.log('Getting all groups')

    const result = await this.dynamoDbClient.scan({
      TableName: this.groupsTable
    })
    return result.Items
  }

  async createGroup(group) {
    console.log(`Creating a group with id ${group.id}`)

    await this.dynamoDbClient.put({
      TableName: this.groupsTable,
      Item: group
    })

    return group
  }
}
