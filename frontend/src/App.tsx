import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalStyle } from './styles/theme.tsx'
import { ThemeContextProvider } from './theme/ThemeContext'
import { defaultCategories } from '@/constants'
import { Layout } from '@/components'

import { Dashboard, Persons, PersonForm, Login, Scanner } from '@/pages'
import { History } from './pages/History'
import { InOut } from './pages/InOut'
import { ManualLoad } from './pages/ManualLoad'
import { Settings } from './pages/Settings/Settings'
import { PersonDetail } from './pages/PersonDetail'
import { About } from './pages/About/About'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token')
  return token ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='inout' element={<InOut />} />
            <Route path='manual' element={<ManualLoad />} />
            <Route path='persons' element={<Persons />} />
            <Route path='persons/new' element={<PersonForm categories={defaultCategories} />} />
            <Route path='persons/:id/edit' element={<PersonForm categories={defaultCategories} />} />
            <Route path='scanner/:mode?' element={<Scanner />} />
            <Route path='history' element={<History />} />
            <Route path='settings' element={<Settings />} />
            <Route path='about' element={<About />} />
            <Route path='persons/:id' element={<PersonDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  )
}

export default App