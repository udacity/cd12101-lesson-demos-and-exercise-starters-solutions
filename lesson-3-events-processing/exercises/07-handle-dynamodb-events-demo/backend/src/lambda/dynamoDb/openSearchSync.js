export async function handler(event) {
  for (const record of event.Records) {
    console.log('Processing record', JSON.stringify(record))
  }
}
