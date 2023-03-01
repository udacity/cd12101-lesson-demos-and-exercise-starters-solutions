import React, { useState, useEffect } from 'react'
import { Group } from './Group'
import { getGroups } from '../api/groups-api'
import { Card } from 'semantic-ui-react'

export function GroupsList() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function getAllGroups() {
      try {
        const groups = await getGroups()
        setGroups(groups)
      } catch (e) {
        alert(`Failed to fetch groups: ${e.message}`)
      }
    }
    getAllGroups()
  }, [])

  return (
    <div>
      <h1>Groups</h1>

      <Card.Group>
        {groups.map((group) => {
          return <Group key={group.id} group={group} />
        })}
      </Card.Group>
    </div>
  )
}
