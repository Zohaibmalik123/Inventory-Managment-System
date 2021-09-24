import React, { Fragment, useState } from 'react';
import './bootstrap.min.css';
import './App.css';
import Login from './Login/login';
import NavBar from './Navbar/Navbar';
import {Switch, Route, Router} from 'react-router-dom'
import DashBoard from './Component/Dashboard/Dashboardlisting';
import BrandListing from './Component/Brands/BrandListing';
import CreateEditBrand from './Component/Brands/CreateEditBrand';
import CategoryListing from './Component/Category/CategoryListing';
import CategoryEdit from './Component/Category/CategoryEdit';
import ProductListing from './Component/Products/ProductListing';
import ProductsCreateEdit from './Component/Products/ProductsCreateEdit';
import Orderslist from './Component/Orders/Orderslist';
import CreateOrderList from './Component/Orders/CreateOrderList';

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(localStorage.usertoken);

  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(localStorage.usertoken);
  }
  return (
    <Fragment >
      
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && (
        <>
          <NavBar logout={logout}/>
          s
          <Switch>
            <Route exact path = "/"  component={DashBoard} />
            <Route exact path = "/brands"  component={BrandListing} />
            <Route exact path = "/brands/create"  component={() => <CreateEditBrand logout={logout}/>}/>
            <Route path = "/brands/edit/:id"  component={() => <CreateEditBrand logout={logout}/>}/>
            <Route exact path = "/category"  component={CategoryListing} />
            <Route exact path = "/category/add"  component={() => <CategoryEdit logout={logout}/>}/>
            <Route path = "/category/edit/:id" component={CategoryEdit}/>
            <Route exact path = "/product"  component={ProductListing} />
            <Route exact path = "/createproducts"  component={() => <ProductsCreateEdit logout={logout}/>} />
            <Route exact path = "/orders"  component={Orderslist} />
            <Route exact path = "/createorders"  component={() => <CreateOrderList logout={logout}/>} />
          </Switch>
        </>
      )}
    </Fragment >
  )
}


export default App;
