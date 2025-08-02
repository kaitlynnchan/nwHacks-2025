import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { UserProvider } from './contexts/UserContext.tsx'
import { NavBarProvider } from './contexts/NavBarContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <NavBarProvider>
        <App />
      </NavBarProvider>
    </UserProvider>
  </StrictMode>,
)
