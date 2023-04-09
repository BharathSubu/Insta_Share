import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';


import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<Router>
    <GoogleOAuthProvider  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}><App/></GoogleOAuthProvider>;
</Router>,);