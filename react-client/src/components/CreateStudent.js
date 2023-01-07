import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import { useNavigate } from 'react-router-dom';

//
function CreateStudent(props) {
  let navigate = useNavigate()
  //
  const [student, setStudent] = useState({ _id: '', studentNumber: '', password: '', firstName: '', lastName: '', 
                address: '', city:'', phoneNumber: '', email:'', program:'', favIDE: '', favLang:''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { studentNumber: student.studentNumber, password: student.password, 
      firstName: student.firstName,lastName: student.lastName, address: student.address,
      city: student.city, phoneNumber:student.phoneNumber, email:student.email, program:student.program,
      favIDE: student.favIDE, favLang: student.favLang  };
      //use promises
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={saveStudent}>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter student number" value={student.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={student.address} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> City </Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter city" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Phone Number </Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" value={student.phoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Program </Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Favorite IDE </Form.Label>
            <Form.Control type="text" name="favIDE" id="favIDE" placeholder="Enter Favorite IDE" value={student.favIDE} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Favorite Language </Form.Label>
            <Form.Control type="text" name="favLang" id="favLang" placeholder="Enter Favorite Language" value={student.favLang} onChange={onChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>

        </Form>
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default CreateStudent;
