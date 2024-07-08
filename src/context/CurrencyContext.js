import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currCurrency, setCurrCurrency] = useState('$');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CurrencyContext.Provider
      value={{ currCurrency, setCurrCurrency, isOpen, setIsOpen }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
