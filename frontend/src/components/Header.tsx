import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { AppDispatch, RootState } from "../redux/store";
import axios from "axios";
import { BASE_URL } from "../config";
const Header: React.FC = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("email");
    axios.post(`${BASE_URL}/user/logout/`, {}, { withCredentials: true });
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className="d-flex align-items-center p-2 pb-5 mb-5 px-5"
    >
      <Navbar.Brand className="d-flex align-items-center">
        Product App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          {email && (
            <Nav.Item>
              <div>{email}</div>
            </Nav.Item>
          )}
          {email && (
            <Nav.Item>
              <Button variant="danger" onClick={handleLogout} className="ms-4">
                Logout
              </Button>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
