import * as uuid from 'uuid'

import { GroupAccess } from '../dataLayer/groupsAccess.mjs'

const groupAccess = new GroupAccess()

export async function getAllGroups() {
  return groupAccess.getAllGroups()
}

export async function createGroup(createGroupRequest, userId) {
  const itemId = uuid.v4()

  return await groupAccess.createGroup({
    id: itemId,
    userId: userId,
    name: createGroupRequest.name,
    description: createGroupRequest.description
  })
}
