import React from 'react';
import { GET_CURRENCIES } from '../../Query';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { useCurrency } from '../../context/CurrencyContext';

import { ColorRing } from 'react-loader-spinner';

function CurrencyDropdown() {
  const { currCurrency, setCurrCurrency, isOpen, setIsOpen } = useCurrency();

  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (loading)
    return (
      <div className="loader_container">
        <ColorRing
          className="loader"
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  if (error) return <p>Error</p>;

  const handleCurrChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="currency_drop_container">
      <div
        className="currency_drop_visible_wrapper"
        onClick={() => handleCurrChange()}
      >
        <p>{currCurrency}</p>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <ul
        className={isOpen ? 'currency_drop_list' : 'currency_drop_list hidden'}
      >
        {data.currencies.map((curr) => {
          return (
            <li
              className="currency_drop_list_item"
              key={curr.label}
              onClick={() => {
                setCurrCurrency(curr.symbol);
                handleCurrChange();
              }}
            >
              <span>{curr.symbol}</span>
              <span>{curr.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CurrencyDropdown;
