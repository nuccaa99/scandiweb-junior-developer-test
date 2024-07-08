import React from 'react';
import './styles/style.css';
import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';

import { CurrencyProvider } from './context/CurrencyContext';

import { GET_CATEGORIES } from './Query';
import { useQuery } from '@apollo/client';

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="App">
      <CurrencyProvider>
        <Header categories={data.categories} />
        <AppRoutes initialCategory={data.categories[0].name} />
      </CurrencyProvider>
    </div>
  );
}

export default App;
