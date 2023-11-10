// import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Profile from './Pages/Profile';

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
