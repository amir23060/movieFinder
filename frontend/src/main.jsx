import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { FavoriteProvider } from './Context/favoriteContext.jsx'
import { ModalProvider } from './Context/modalContext.jsx'
import { SearchProvider } from './Context/searchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
      <BrowserRouter>
      <AuthProvider>
        <FavoriteProvider>
          <ModalProvider>
           <SearchProvider>
               <App />
               </SearchProvider>
          </ModalProvider>
        </FavoriteProvider>
      </AuthProvider>
       
      </BrowserRouter>
    
  </StrictMode>,
)