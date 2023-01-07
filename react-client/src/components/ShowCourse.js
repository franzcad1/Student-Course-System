import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import { useNavigate, useParams } from 'react-router-dom';

function ShowCourse(props) {
  let navigate = useNavigate()
  let {id} = useParams();
  //
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    navigate('/editcourse/' + id);
    
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = { code: data.code, name: data.name, section: data.section, semester: data.semester };
    //
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        navigate('/listcourses')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
        <h1>Course Code: {data.code}</h1>
        <p>Name: {data.name}</p>
        <p>Section: {data.section}</p>
        <p>Semester: {data.semester}</p>
        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Update</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Drop</Button>
        </p>
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default ShowCourse;
