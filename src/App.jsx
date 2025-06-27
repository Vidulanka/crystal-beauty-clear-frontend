import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import Testing from './pages/testing';
import Toster, { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResponsiveTesting from './pages/test';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;



function App() {
  return (
    <GoogleOAuthProvider clientId= {clientId}>
    <BrowserRouter>
      <Toaster  position ="top-right"/>
      <Routes>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/r" element={<ResponsiveTesting/>}/>
        <Route path="/*" element={<HomePage/>}/>
       
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>

);
}

export default App;
//965270288185-k2hhgd4m59sk07ut1g4trgdn4g0e4dqm.apps.googleusercontent.com