import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import { NotFound } from './components/NotFound'
import { ImagesList } from './components/ImagesList'
import { GroupsList } from './components/GroupsList'
import { CreateGroup } from './components/CreateGroup'
import { CreateImage } from './components/CreateImage'

export default function App() {
  function generateMenu() {
    return (
      <Menu>
        <Menu.Item as={Link} to={'/'}>
          Home
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <BrowserRouter>
                {generateMenu()}

                <Routes>
                  <Route path="/" exact element={<GroupsList />} />
                  <Route path="/groups/create" element={<CreateGroup />} />
                  <Route path="/images/:groupId" element={<ImagesList />} />
                  <Route path="/images/:groupId/create" element={<CreateImage />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}
