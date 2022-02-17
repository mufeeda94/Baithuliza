import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import {DataContext} from '../../../Context/Context'
function ViewService() {

    const [data, setdata] = useState([])
    const getServices =()=>{
        
            axios.get('http://localhost:8008/viewService').then((response)=>{
                console.log(response);
                setdata(response.data.service)
            })
        
        
    }
    useEffect(() => {
        getServices()
    }, [])

  return (
    <div>
         <div className='main-i' >
            
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>items</th>
                        <th>Location</th>
                        <th>Contact</th>
        
                    </tr>
                </thead>
                <tbody>
                    {data.map((i) => (
                        <tr>
                            <td>{i.item}</td>
                            <td>{i.location}</td>
                            <td>{i.contact}</td>
                            <td></td>

                            {/* <td><button onClick={()=>deleteUser(i._id)}  className='btn btn-danger' >Delete</button></td> */}
                        </tr>

                    ))}



                </tbody>
            </table>
            


            
        </div>
    </div>
  )
}

export default ViewService

