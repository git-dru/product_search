import React from "react";
import { useSelector } from "react-redux";
import { Authentication } from "./components/Authentication";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ProductTable from "./components/ProductTable";
const App = () => {
  return (
    <Container>
      <Header />
      <Authentication />
      <ProductTable />
      <ToastContainer />
    </Container>
  );
};
export default App;
