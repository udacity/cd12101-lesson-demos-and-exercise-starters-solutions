import React, { useEffect, useState } from 'react'
import { getImages } from '../api/images-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { UdagramImage } from './UdagramImage'
import { Link, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export function ImagesList() {
  const { groupId } = useParams()
  const [images, setImages] = useState([])
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function fetchImages() {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://test-endpoint.auth0.com/api/v2/`,
          scope: 'read:images'
        })
        const images = await getImages(accessToken, groupId)
        setImages(images)
      } catch (e) {
        alert(`Failed to fetch images for group : ${e.message}`)
      }
    }
    fetchImages()
  }, [groupId, getAccessTokenSilently])

  return (
    <div>
      <h1>Images</h1>

      <Button
        primary
        size="huge"
        className="add-button"
        as={Link}
        to={`/images/${groupId}/create`}
      >
        Upload new image
      </Button>

      <Divider clearing />

      <Card.Group>
        {images.map((image) => {
          return <UdagramImage key={image.imageId} image={image} />
        })}
      </Card.Group>
    </div>
  )
}
