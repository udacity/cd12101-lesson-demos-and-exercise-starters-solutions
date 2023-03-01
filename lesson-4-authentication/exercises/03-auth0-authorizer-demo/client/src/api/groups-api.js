export async function getGroups(idToken) {
  console.log('Fetching groups')

  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  const result = await response.json()

  return result.items
}

export async function createGroup(idToken, newGroup) {
  const reply = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({
      name: newGroup.name,
      description: newGroup.description
    })
  })
  const result = await reply.json()
  return result.newItem
}
