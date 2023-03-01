import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import { NotFound } from './components/NotFound'
import { LogIn } from './components/LogIn'
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

        <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  function logInLogOutButton() {
    if (isAuthenticated) {
      return (
        <Menu.Item
          name="logout"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={() => loginWithRedirect()}>
          Log In
        </Menu.Item>
      )
    }
  }

  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()

  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <BrowserRouter>
                {generateMenu()}

                {generateCurrentPage(isAuthenticated)}
              </BrowserRouter>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

function generateCurrentPage(isAuthenticated) {
  if (!isAuthenticated) {
    return <LogIn />
  }

  return (
    <Routes>
      <Route path="/" exact element={<GroupsList />} />
      <Route path="/groups/create" element={<CreateGroup />} />
      <Route path="/images/:groupId" element={<ImagesList />} />
      <Route path="/images/:groupId/create" element={<CreateImage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
