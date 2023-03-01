import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Divider } from 'semantic-ui-react'
import { getGroups } from '../api/groups-api'
import { Group } from './Group'
import { useAuth0 } from '@auth0/auth0-react'

export function GroupsList() {
  const [groups, setGroups] = useState([])
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function getAllGroups() {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://test-endpoint.auth0.com/api/v2/`,
          scope: 'read:groups'
        })
        console.log('Access token: ' + accessToken)
        const groups = await getGroups(accessToken)
        setGroups(groups)
      } catch (e) {
        alert(`Failed to fetch groups: ${e.message}`)
      }
    }
    getAllGroups()
  }, [getAccessTokenSilently])

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
