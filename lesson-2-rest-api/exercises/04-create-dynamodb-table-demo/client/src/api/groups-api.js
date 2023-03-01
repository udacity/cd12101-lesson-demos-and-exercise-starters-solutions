export async function getGroups() {
  console.log('Fetching groups')

  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups`)
  const result = await response.json()

  return result.items
}
