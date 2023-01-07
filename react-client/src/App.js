import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import List from './components/List';
import EditUser from './components/EditUser';
import EditCourse from './components/EditCourse';

import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';
import ShowCourse from './components/ShowCourse';
import ListCourses from "./components/ListCourses";

import Home from './components/Home';
import Login from './components/Login';
import ListStudentCourses from './components/ListStudentCourse';
//
function App() {

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student/Course System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/list">List of Students</Nav.Link>
              <Nav.Link as={Link} to="/listcourses">List of Courses</Nav.Link>
              <Nav.Link as={Link} to="/liststudentcourse">List of Students per Course</Nav.Link>
              <Nav.Link as={Link} to="/create">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />         
          <Route path="create" element ={< CreateStudent />} />
          <Route path="login" element= {< Login />}  />
          <Route path="list" element= {< List />}  />
          <Route path="listcourses" element= {< ListCourses />}  />
          <Route path="edit/:id" element= {< EditUser />}  />
          <Route path="show/:id" element= {< ShowStudent />}  />
          <Route path="showcourse/:id" element= {< ShowCourse />}  />
          <Route path="editcourse/:id" element= {< EditCourse />}  />
          <Route path="liststudentcourse" element= {< ListStudentCourses />}  />
        </Routes>
      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
