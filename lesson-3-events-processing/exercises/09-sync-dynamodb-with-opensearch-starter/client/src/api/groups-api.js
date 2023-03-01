export async function getGroups() {
  console.log('Fetching groups')

  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups`)
  const result = await response.json()

  return result.items
}

export async function createGroup(newGroup) {
  const reply = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newGroup.name,
      description: newGroup.description
    })
  })
  const result = await reply.json()
  return result.newItem
}
