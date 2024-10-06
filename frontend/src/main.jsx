
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './store/Store.jsx'

createRoot(document.getElementById('root')).render(

<Provider store={Store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>


)
