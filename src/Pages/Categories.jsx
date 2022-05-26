import React, { useState, useEffect } from "react";
import MenuComponent from "../Components/SideMenuMain/MenuComponent";
import { getTypeOfCategory } from "../API/Networking";
import {Route, useRouteMatch} from 'react-router-dom'
import CategoriesInDetail from "../Components/Categories/CategoriesInDetail";
const Categories = () => {
  const {path} = useRouteMatch();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getTypeOfCategory().then((res) => {
      setCategory(res);
    });
  }, []);
  return (
    <div className="categories">
      <div className="categories__container">
        <div className="categories__left">
          {category.map((item, index) => {
            return <MenuComponent key={index} name={item.name} id={item.id} />;
          })}
        </div>
        <div className="categories__right">
          <div className="categories__filter">
            <div className="categories__filter__container">
                
            </div>
          </div>
          <Route path={`${path}/:id/:name`}>
            <CategoriesInDetail/>
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Categories;
