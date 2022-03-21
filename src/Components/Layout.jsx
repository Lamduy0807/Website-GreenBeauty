import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from '../Routes/Routes';
import Header from './Header';

const Layout = () => {
  return (
    <BrowserRouter>
      <Route render={props =>(
        <div>
          <Header {...props}/>
          <div className="container">
            <div className="main">
              <Routes/>
            </div>
          </div>
        </div>
      )}/>
    </BrowserRouter>
  )
};

export default Layout;
