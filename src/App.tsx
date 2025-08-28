import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from './router';
import './App.css'

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <ToastContainer />
      {content}
    </>
  )
}

export default App
