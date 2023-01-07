import CreateCourse from './CreateCourse';
import ListArticles from './ListCourses';

import React, { useState } from 'react';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [articleOperation, setArticleOperation] = useState('no-op');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listCourses = (studentNumber) => {

    console.log('in listArticles: ',studentNumber)

  }
  //
  const createCourse = () => {
    console.log('in createCourse')

  }
  //
  return (
    <div className="App">
      {
        (() => {
          switch (articleOperation) {
            case 'list':
              return <ListArticles />
            case 'create':
              return <CreateCourse screen={screen} setScreen={setScreen} />
            
            default:
              return <div>
              <p>{screen}</p>
              <p>{data}</p>
              <button onClick={() => setArticleOperation('create')}>Add Courses</button>
              
              <button onClick={() => setArticleOperation('list')}>List Courses</button>
  
              <button onClick={deleteCookie}>Log out</button>
            </div> 
          }
        })()
                   
      }

    </div>
  );
}
//
export default View;