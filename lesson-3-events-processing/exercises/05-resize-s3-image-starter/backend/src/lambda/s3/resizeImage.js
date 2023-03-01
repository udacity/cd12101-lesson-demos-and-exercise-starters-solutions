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
  // TODO: Implement this function
}

async function s3BodyToBuffer(s3Body) {
  const chunks = []
  for await (let chunk of s3Body) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
