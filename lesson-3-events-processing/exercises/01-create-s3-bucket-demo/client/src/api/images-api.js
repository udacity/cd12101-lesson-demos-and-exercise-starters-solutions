export async function getImages(groupId) {
  console.log('Fetching images')
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/groups/${groupId}/images`
  )
  const result = await response.json()

  return result.items
}

export async function createImage(newImage) {
  const reply = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/groups/${newImage.groupId}/images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newImage.title
      })
    }
  )

  return await reply.json()
}
