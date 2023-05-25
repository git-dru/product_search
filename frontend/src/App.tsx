import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Authentication } from "./components/Authentication";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ProductTable from "./components/ProductTable";
import { RootState } from "./redux/store";

const PrivateRoute = () => {
  const email = useSelector((state: RootState) => state.auth.email);

  return email ? <ProductTable /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Container>
      <Router>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/login" element={<Authentication />} />
            <Route path="/products" element={<PrivateRoute />} />
            {/* Redirect to login page if route does not exist */}
            <Route path="/" element={<Authentication />} />
          </Routes>
        </Fragment>
      </Router>
      <ToastContainer />
    </Container>
  );
};
export default App;
