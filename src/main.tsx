import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles'
import { AppThemeProvaider } from './contexts/AppThemeContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvaider>
      <GlobalStyle />
      <App />
    </AppThemeProvaider>
  </StrictMode>
)
