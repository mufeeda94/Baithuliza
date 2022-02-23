import React from 'react'
import {useParams,useLocation} from 'react-router-dom'
function Category() {
    const {name}=useLocation()
    console.log("arre",name);
  return (
    <div>
        <h1>hello</h1>
    </div>
  )
}

export default Category