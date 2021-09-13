import React, { Fragment, useState } from 'react';
import './bootstrap.min.css';
import './App.css';
import Login from './Login/login';
import NavBar from './Navbar/Navbar';
import  {Switch , Route}  from 'react-router-dom'
import Dashboard from './Component/Dashboard';
import BrandListing from './Component/Brands/BrandListing';
import CreateEditBrand from './Component/Brands/CreateEditBrand';
import CategoryListing from './Component/Category/CategoryListing';
import CategoryEditBrands from './Component/Category/CategoryEditBrands';
import ProductListing from './Component/Products/ProductListing';
import ProductsCreateEdit from './Component/Products/ProductsCreateEdit';
import Orderslist from './Component/Orders/Orderslist';
import CreateOrderList from './Component/Orders/CreateOrderList';

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(localStorage.usertoken);
  return (
    <Fragment >
      
      {!isLoggedIn && <Login  setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && (
        <>
          <NavBar/>
          
          <Switch>
            <Route exact path = "/dashboard"  component={Dashboard} />
            <Route exact path = "/brands"  component={BrandListing} />
            <Route exact path = "/brands/create"  component={CreateEditBrand} />
            <Route exact path = "/category"  component={CategoryListing} />
            <Route exact path = "/createlist"  component={CategoryEditBrands} />
            <Route exact path = "/product"  component={ProductListing} />
            <Route exact path = "/createproducts"  component={ProductsCreateEdit} />
            <Route exact path = "/orders"  component={Orderslist} />
            <Route exact path = "/createorders"  component={CreateOrderList} />
          </Switch>
        </>
      )}
    </Fragment >
  )
}


export default App;
