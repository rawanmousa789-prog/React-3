import Home from './pages/Home';
import User from './pages/User';
import Framework from './pages/Framework';
import Tips from './pages/Tips';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {useContext } from "react";
import Data from "./context/Data";
import SginIn from './pages/SginIn';
import SginUp from './pages/SginUp';
import Error404 from './pages/Error404';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/User",
    element: <User />,
  },
  {
    path: "/Framework",
    element: <Framework />,
  },
  {
    path: "/Tips",
    element: <Tips />,
  },
  {
    path: "/SginIn",
    element: <SginIn />,
  },
  {
    path: "/SginUp",
    element: <SginUp />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

function App() {
  const {theme} = useContext(Data);

  return (
    <div className={ `${theme}`}>
      <RouterProvider router={router} />
    </div>
    
    
  );
}

export default App;
