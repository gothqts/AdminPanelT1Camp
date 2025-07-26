import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'styles/sanitize.css'
import 'styles/variables.css'
import 'styles/fonts.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
