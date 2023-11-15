// import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

import Profile from './Pages/Profile';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/forget-password" element={<ForgetPassword/>}/>
    <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
