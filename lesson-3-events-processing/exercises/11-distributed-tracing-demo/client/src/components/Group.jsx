import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function Group(props) {
  const { group } = props

  return (
    <Card>
      <Card.Content>
        <Card.Header><Link to={`/images/${group.id}`}>{group.name}</Link></Card.Header>
        <Card.Description>{group.description}</Card.Description>
      </Card.Content>
    </Card>
  )
}
