import React from "react";
import {Link} from "react-router-dom";
import GoogleAuth from './GoogleAuth';
const header = ()=>{
    return <div className="ui secondary pointing menu">
          <Link to="/" className="item">
            Home
          </Link>
          <Link to="/" className="item">
            All items
          </Link>
          <GoogleAuth/>
          <div className="right menu">

          </div>
        </div>
}
export default header;