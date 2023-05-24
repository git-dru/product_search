import React from "react";
import { useSelector } from "react-redux";
import { Authentication } from "./components/Authentication";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
  const email = useSelector((state: any) => state.auth.email);
  console.log(email);
  return (
    <Container>
      <Header />
      <Authentication />
    </Container>
  );
};
export default App;
