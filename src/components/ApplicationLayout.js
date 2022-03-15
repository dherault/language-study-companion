import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material'
import TranslateIcon from '@mui/icons-material/Translate'

function ApplicationLayout({ children }) {

  return (
    <div className="min-h-100vh background-neutral">
      <AppBar position="relative">
        <Toolbar>
          <Link
            color="inherit"
            component={RouterLink}
            to="/"
            underline="none"
          >
            <TranslateIcon />
          </Link>
          <Link
            color="inherit"
            component={RouterLink}
            to="/"
            underline="none"
            className="ml-4"
          >
            <Typography>
              Study
            </Typography>
          </Link>
          <Link
            color="inherit"
            component={RouterLink}
            to="/contribution"
            underline="none"
            className="ml-2"
          >
            <Typography>
              How to contribute
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        className="pt-2 pb-12 px-2"
      >
        {children}
      </Container>
    </div>
  )
}

export default ApplicationLayout
