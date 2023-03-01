export async function getImages(idToken, groupId) {
  console.log('Fetching images')
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/groups/${groupId}/images`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  const result = await response.json()

  return result.items
}

export async function createImage(idToken, newImage) {
  const reply = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/groups/${newImage.groupId}/images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newImage.title
      })
    }
  )

  return await reply.json()
}

export async function uploadFile(uploadUrl, file) {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}
