import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Divider } from 'semantic-ui-react'
import { getGroups } from '../api/groups-api'
import { Group } from './Group'

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

      <Button
        primary
        size="huge"
        className="add-button"
        as={Link}
        to="/groups/create"
      >
        Create new group
      </Button>

      <Divider clearing />

      <Card.Group>
        {groups.map((group) => {
          return <Group key={group.id} group={group} />
        })}
      </Card.Group>
    </div>
  )
}
