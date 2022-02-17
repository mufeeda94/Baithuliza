import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function Signup() {
    let history = useHistory()
    const [error, seterror] = useState('')
    const [input, setinput] = useState({
        Name:'',
        Email:'',
        Password:''
    })
  const  handleChane =(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
    }
    const handleClick =()=>{
        axios.post('http://localhost:8008/signup',input).then((result)=>{
            console.log(result);
            result.data.message ==='set' ?  history.push('/About') : seterror('something went wrong')
        })
    }
    return (
        <div>
<h1>Signup Page</h1>
<div className="container" >
        <h1>  {error && 'something went wrong'}  </h1>
          
            <h1 className="h1">Register</h1>
            {/* {error ? <h2 style={{color:'red'}}>{error}</h2> : "" } */}
            {/* <input onChange={handleChane}  name="Name" value={input.Name} placeholder="Name" class="input" autoComplete='off' type="text " />
            <input onChange={handleChane}  name="Email" value={input.Email} placeholder="Email" class="input" autoComplete='off' type="email " /> */}
            {/* <input onChange={handleChane}  name="Password" value={input.Password} placeholder="password" class="input" type="password" /> */}
            {/* <button onClick={handleClick}  type="submit" class="button">Login </button> */}
          
         <input type="text" name='Name' value={input.Name} onChange={handleChane} placeholder='Name'  /><br/><br/>
         <input type="email" name='Email' value={input.Email} onChange={handleChane} placeholder='Email' /><br/><br/>
         <input type="text" name='Password' value={input.Password} onChange={handleChane} placeholder='Password'  /><br/><br/>
         <button onClick={handleClick}>Signup</button><br/><br/>
          <Link to='/sigin'>  <Button>Already have an account ?</Button> </Link>
        </div>
        </div>
    )
}

export default Signup
