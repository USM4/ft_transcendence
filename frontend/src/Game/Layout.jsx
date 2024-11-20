import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h1>Game</h1>
      <Outlet />
    </div>
  );
}