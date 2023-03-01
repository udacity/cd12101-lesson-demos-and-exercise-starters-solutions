import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { createImage, uploadFile } from '../api/images-api'

const NO_UPLOAD = 'NoUpload'
const UPLOADING_DATA = 'UploadingData'
const UPLOADING_FILE = 'UploadingFile'

export function CreateImage() {
  const { groupId } = useParams()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(undefined)
  const [uploadState, setUploadState] = useState(NO_UPLOAD)

  function renderButton() {
    return (
      <div>
        {uploadState === UPLOADING_DATA && <p>Uploading image metadata</p>}
        <Button loading={uploadState !== NO_UPLOAD} type="submit">
          Upload
        </Button>
      </div>
    )
  }

  async function createNewImage() {
    if (!file) {
        alert('File should be selected')
        return
      }

    try {
      setUploadState(UPLOADING_DATA)
      const uploadInfo = await createImage({
        groupId: groupId,
        title: title
      })

      console.log('Created image', uploadInfo)


      setUploadState(UPLOADING_FILE)
      await uploadFile(uploadInfo.uploadUrl, file)

      alert('Image was uploaded!')

    } catch (e) {
      alert('Could not upload an image: ' + e.message)
    } finally {
      setUploadState(NO_UPLOAD)
    }
  }

  function handleFileChange(event) {
    const files = event.target.files
    if (!files) return

    console.log('File change', files)
    setFile(files[0])
  }

  return (
    <div>
      <h1>Upload new image</h1>

      <Form onSubmit={createNewImage}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Image title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={handleFileChange}
            />
          </Form.Field>

        {renderButton()}
      </Form>
    </div>
  )
}
