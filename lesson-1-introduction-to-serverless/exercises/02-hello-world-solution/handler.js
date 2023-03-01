export const handler = async (event) => {
  console.log('Event: ', event)

  return {
    result: `Hello ${event.name} !`
  }
}
