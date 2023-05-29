import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import './index.css'
import { Alert } from "./components/notification/Alert.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Provider store={store}>
      <Alert/>
    <App />
   </Provider>
  
)
