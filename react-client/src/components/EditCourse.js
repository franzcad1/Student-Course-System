import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import { useNavigate, useParams } from 'react-router-dom';

function EditCourse(props) {
  //
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  //
  const [course, setCourse] = useState({ _id: '', code: '', 
  name: '', section: '', semester: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { code: course.code, name: course.name, section: course.section, semester: course.semester};
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        navigate('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateCourse}>
        <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control type="text" name="code" id="code" placeholder="Enter Course Code" value={course.code} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control type="text" name="name" id="name" placeholder="Enter Course Name" value={course.name} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control type="text" name="section" id="section" placeholder="Enter Section" value={course.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control type="text" name="semester" id="semester" placeholder="Enter Semester" value={course.semester} onChange={onChange} />
              </Form.Group>
          
          
        
          <Button variant="primary" type="submit">
            Update Course
          </Button>
        </Form>
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default EditCourse;
