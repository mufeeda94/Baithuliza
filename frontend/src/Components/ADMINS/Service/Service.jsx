import axios from 'axios';
import React from 'react';
import {useState} from 'react';

function Service() {
    const [input, setinput] = useState({
        item:'',
        location:'',
        contact:''
    })
  const  handleChange=(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
    }
    const handleSubmit=()=>{
        axios.post('http://localhost:8008/admin/addService',input).then((result)=>{
            console.log(result)
        })
    }
    
  return (
    <div className="container" >
        <div>
            <input type="text" name="item" placeholder="item" onChange={handleChange} />
        </div>
        <div>
            <input type="text" name="location" placeholder="location" onChange={handleChange}  />
        </div>
        <div>
            <input type="text" name="contact" placeholder="contact" onChange={handleChange} />
        </div>
        <div>
            <input type="button" value="submit" onClick={handleSubmit} />
        </div>
        
    </div>
  )
}

export default Service