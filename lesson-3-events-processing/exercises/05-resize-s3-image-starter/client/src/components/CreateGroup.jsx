import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createGroup } from '../api/groups-api'

export function CreateGroup() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [uploadingGroup, setUploadingGroup] = useState(false)

  async function submitForm() {
    try {
      if (!name || !description) {
        alert('Name and description should be provided')
        return
      }

      setUploadingGroup(true)
      const group = await createGroup({
        name: name,
        description: description
      })

      console.log('Created description', group)

      alert('Group was created!')
    } catch (e) {
      alert('Could not upload an image: ' + e.message)
    } finally {
      setUploadingGroup(false)
    }
  }

  return (
    <div>
      <h1>Upload new group</h1>

      <Form onSubmit={submitForm}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Group name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Group description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Button loading={uploadingGroup} type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}
