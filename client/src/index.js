import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AuthProvider from './providers/AuthProvider';
import NoteProvider from './providers/NoteProvider';

ReactDOM.render(
  <AuthProvider>
    <NoteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>  
    </NoteProvider>
  </AuthProvider>,
  document.getElementById('root')
);