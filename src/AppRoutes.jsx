import React from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import routes from './config/routes';

const AppRoutes = ({ initialCategory }) => {
  return (
    <Routes>
      {routes.map((route) => {
        if (route.path === '/') {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to={`category/${initialCategory}`} />}
            />
          );
        } else {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          );
        }
      })}
    </Routes>
  );
};

export default AppRoutes;
