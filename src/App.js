import Home from './pages/Home';
import Basic from './pages/Basic';
import Framework from './pages/Framework';
import Tips from './pages/Tips';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {useContext } from "react";
import Data from "./context/Data";
import SginIn from './pages/SginIn';
import SginUp from './pages/SginUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Not Found</h1>,
  },
  {
    path: "/Basic",
    element: <Basic />,
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
