import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import { useNavigate, useParams } from 'react-router-dom';
//
function ShowStudent(props) {
  let navigate = useNavigate();
  // Get the studentId param from the URL.
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  //const apiUrl = "http://localhost:3000/students/" + props.match.params.id;
  const apiUrl = "http://localhost:3000/students/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
    /*
    props.history.push({
      pathname: '/edit/' + id
    });
    */
   navigate('/edit/' + id);
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const student = { studentNumber: data.studentNumber, password: data.password, 
      firstName: data.firstName,lastName: data.lastName, address: data.address, city:data.city, phoneNumber:data.phoneNumber, email: data.email, program: data.program,
    favIDE: data.favIDE, favLang: data.favLang };
  
    axios.delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        //props.history.push('/list')
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
        <h1>Student Number: {data.studentNumber}</h1>
        <p>Name: {data.firstName} {data.lastName}</p>
        <p>Address: {data.city}, {data.address}</p>
        <p>Phone Number: {data.phoneNumber}</p>
        <p>Email: {data.email}</p>
        <p>Program: {data.program}</p>
        <p>Favorite IDE: {data.favIDE}</p>
        <p>Favorite Language: {data.favLang}</p>

     
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default ShowStudent;
