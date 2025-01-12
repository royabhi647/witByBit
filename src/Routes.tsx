import React from 'react';
import { Routes, Route } from 'react-router-dom';
import sidebarData from './sidebarData';
import AddProduct from './pages/AddProduct';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {sidebarData.map((item) => (
        <Route
          key={item.slug}
          path={item.slug}
          element={<item.component />}
        />
      ))}
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default AppRoutes;