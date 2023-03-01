import React from 'react'
import { Card } from 'semantic-ui-react'

export function Group(props) {
  const { group } = props

  return (
    <Card>
      <Card.Content>
        <Card.Header>{group.name}</Card.Header>
        <Card.Description>{group.description}</Card.Description>
      </Card.Content>
    </Card>
  )
}
