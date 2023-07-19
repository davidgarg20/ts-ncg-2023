import './App.css';
import Home from './components/Home';
import Views from './components/Views';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import EditView from './components/EditView';


function App() {
  const routes = createBrowserRouter([
    {"path": "/", element: <Home />},
    {"path": "/views", element: <Views />},
    {"path": "/view/edit/:id", element: <EditView />}
  ]);
  return (
    <div className="App">
      <h1>World Bank Data App</h1>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
