
//import withRouter from './withRouter';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Student/Course System</h2>
            <p>Login to access CRUD operations</p>
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;