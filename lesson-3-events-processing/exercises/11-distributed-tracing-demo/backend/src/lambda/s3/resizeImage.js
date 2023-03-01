import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import sharp from 'sharp'

const s3Client = new S3Client()

const imagesBucket = process.env.IMAGES_S3_BUCKET
const thumbnailsBucket = process.env.THUMBNAILS_S3_BUCKET

export async function handler(event) {
  console.log('Processing S3 event ', JSON.stringify(event))

  for (const record of event.Records) {
    await resizeImage(record)
  }
}

async function resizeImage(record) {
  const key = record.s3.object.key
  console.log('Processing image with key: ', key)

  const getCommand = new GetObjectCommand({
    Bucket: imagesBucket,
    Key: key
  })
  const response = await s3Client.send(getCommand)

  const s3Body = response.Body
  const imageBuffer = await s3BodyToBuffer(s3Body)

  const convertedBuffer = await sharp(imageBuffer)
    .resize({
      fit: sharp.fit.contain,
      width: 150
    })
    .toBuffer()

  console.log(`Writing image back to S3 bucket: ${thumbnailsBucket}`)
  const putCommand = new PutObjectCommand({
    Bucket: thumbnailsBucket,
    Key: key,
    Body: convertedBuffer
  })
  await s3Client.send(putCommand)
}

async function s3BodyToBuffer(s3Body) {
  const chunks = []
  for await (let chunk of s3Body) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
