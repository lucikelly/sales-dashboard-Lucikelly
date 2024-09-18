import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles'
import { AppThemeProvaider } from './contexts/AppThemeContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/index.ts'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvaider>
        <GlobalStyle />
        <App />
      </AppThemeProvaider>
    </Provider>
  </StrictMode>
)
