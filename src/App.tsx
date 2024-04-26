import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ParentRoute from './pages/ParentRoute';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        {/* ParentRoute with an Outlet for child components */}
        <Route path="/" element={<ParentRoute />}>
          {/* Index route for the SignIn component */}
          <Route index element={<SignIn />} />
        </Route>
        <Route path='home-page' element={<HomePage/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
