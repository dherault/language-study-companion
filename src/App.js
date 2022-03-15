import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import ApplicationLayout from './components/ApplicationLayout'
import Home from './scenes/Home'
import Contribution from './scenes/Contribution'

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <ApplicationLayout>
                <Home />
              </ApplicationLayout>
            )}
          />
          <Route
            exact
            path="/contribution"
            element={(
              <ApplicationLayout>
                <Contribution />
              </ApplicationLayout>
            )}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
