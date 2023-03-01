import React, { useEffect, useState } from 'react'
import { getImages } from '../api/images-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { UdagramImage } from './UdagramImage'
import { Link, useParams } from 'react-router-dom'

export function ImagesList() {
  const { groupId } = useParams()
  const [images, setImages] = useState([])

  useEffect(() => {
    async function fetchImages() {
      try {
        const images = await getImages(groupId)
        setImages(images)
      } catch (e) {
        alert(`Failed to fetch images for group : ${e.message}`)
      }
    }
    fetchImages()
  }, [groupId])

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
