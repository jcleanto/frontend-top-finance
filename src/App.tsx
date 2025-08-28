import { useRoutes } from 'react-router-dom';
import routes from './router';
import './App.css'

function App() {
  const content = useRoutes(routes);

  return (
    <>
      {content}
    </>
  )
}

export default App
