import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApolloAppProvider from './ApolloProvider';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloAppProvider>
    <Router>
      <App />
    </Router>
  </ApolloAppProvider>
);
