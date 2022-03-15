import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material'

function ApplicationLayout({ children }) {

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Link
            color="inherit"
            component={RouterLink}
            to="/"
            underline="none"
          >
            <Typography variant="h6">
              Language Study Companion
            </Typography>
          </Link>
          <Link
            color="inherit"
            component={RouterLink}
            to="/contribution"
            underline="none"
            className="ml-4"
          >
            <Typography>
              How to contribute
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        className="pt-2 pb-12"
      >
        {children}
      </Container>
    </>
  )
}

export default ApplicationLayout
