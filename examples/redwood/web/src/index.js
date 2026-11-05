import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import ReactDOM from 'react-dom'
import Routes from 'src/Routes'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import './index.css'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <Routes />
    </RedwoodProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app'),
)
