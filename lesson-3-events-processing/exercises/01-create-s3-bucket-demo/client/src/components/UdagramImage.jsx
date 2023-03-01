import * as React from 'react'
import { Card, Image } from 'semantic-ui-react'

export function UdagramImage(props) {

    const {image} = props;

    return (
      <Card fluid color="red">
        <Card.Content>
          <Card.Header>{image.title}</Card.Header>
          <Card.Description>{image.timestamp}</Card.Description>
          {image.imageUrl && (
            <Image src={image.imageUrl} />
          )}
        </Card.Content>
      </Card>
    )
}