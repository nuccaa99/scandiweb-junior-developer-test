import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        id
        name
        gallery
        inStock
        brand
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCT_INFO = gql`
  query GetProductInfo($productId: String!) {
    product(id: $productId) {
      id
      name
      gallery
      brand
      description
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;
