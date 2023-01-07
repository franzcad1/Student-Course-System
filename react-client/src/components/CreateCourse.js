import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//


//
function CreateCourse(props) {
    //
    let navigate = useNavigate();
    //
    const studentNumber = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState({ _id: '', code: '', name: '', section: '', semester: '', studentNumber: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses"
    //
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {code: course.code, name: course.name, section: course.section, semester: course.semester, studentNumber: studentNumber};
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            navigate('/showcourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();   

        setCourse({...course, [e.target.name]: e.target.value});

      }
    
    return (
        <div>
        <h2> Add a course </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
            <Form onSubmit={saveCourse}>
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
                Add Course
              </Button>
            </Form>
        </div>
    );


}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default CreateCourse;
