import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/actions/userActions";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

export const Authentication = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username === "" || password === "") {
      return console.log("Input all data");
    }
    try {
      const response = await axios.post("http://localhost:8000/user/login/", {
        username,
        password,
      });
      if (response.status === 200) {
        const { email } = response.data;
        dispatch(authUser(email));
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <Form className="d-flex justify-content-center align-items-center flex-column w-25 m-auto mt-5 pt-5">
      <Form.Group controlId="formBasicEmail" className="w-100">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="w-100 mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="button"
        onClick={handleLogin}
        className="w-100"
      >
        Login
      </Button>
    </Form>
  );
};
