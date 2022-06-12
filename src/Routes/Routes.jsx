import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";

import Cart from "../Pages/Cart";
import Product from "../Pages/DetailProduct";

import AnalyticsIngredient from "../Components/AnalyticsIngredient/AnalyticsIngredient";
import Profile from "../Pages/Profile";
import OrderManage from "../Pages/OrderManage";
import LoveList from "../Pages/LoveList";
import Address from "../Pages/Address";
import Categories from "../Pages/Categories";
import SearchPage from "../Pages/SearchPage";
import { Checkout } from "../Pages/Checkout";

import AnalyticsIngredient from '../Components/AnalyticsIngredient/AnalyticsIngredient';
import Profile from '../Pages/Profile'
import OrderManage from '../Pages/OrderManage';
import LoveList from '../Pages/LoveList';
import Address from '../Pages/Address';
import Categories from '../Pages/Categories';
import SearchPage from '../Pages/SearchPage';
import DetailOrder from '../Pages/DetailOrder'
const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/product/:slug' exact component={Product}/>
      <Route path='/cart' exact component={Cart}/>
      <Route path = '/analys' exact component={AnalyticsIngredient}/>
      <Route path='/profile' exact component={Profile}/>
      <Route path='/order-manage' exact component={OrderManage}/>
      <Route path='/product-love' exact component={LoveList}/>
      <Route path='/address'  component={Address}/>
      <Route path='/order-manage/detail/:id' exact component={DetailOrder} />
      <Route path='/categories'>
        <Categories/>
      </Route>
      <Route path="/search/:name" exact component={SearchPage} />
      <Route path="/checkout" component={Checkout} />
    </Switch>
  );
};

export default Routes;
