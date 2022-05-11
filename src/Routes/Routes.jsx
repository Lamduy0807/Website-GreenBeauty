import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from '../Pages/Home'

import Cart from '../Pages/Cart'
import Product from '../Pages/DetailProduct'
const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/product/:productId' exact component={Product}/>
      <Route path='/cart' exact component={Cart}/>
    </Switch>
  )
};

export default Routes;
