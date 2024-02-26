import { BrowseRouter, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Fall from './components/fallback'
import Inicio from './components/loginForm'

const Login = lazy(() => import('./pages/login'))

export default function Rutas () {
  return (
    <BrowseRouter>
      <Inicio>
        <Suspense fallback={<Fall />}>
          <Routes>
            <Route path='/login' component={Login} />
          </Routes>
        </Suspense>
      </Inicio>
    </BrowseRouter>
  )
}
