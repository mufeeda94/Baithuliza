import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { BrowserRouter, Route, Link ,useHistory} from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import Admin from '../AdminLogin/Admin'
import Showallusers from '../ShowAllUsers/Showallusers'
import './AdminHome.css'
import Tabl from '../AdminTable/Table'
import Datatable from '../AdminTable/Datatables'

function AdminHome() {
  const [items, setitems] = useState([])
  const { Users, Cartcount, AdminTrue } = useContext(DataContext)
  const [adminTrue, setadminTrue] = AdminTrue
  const history=useHistory()
  // const getAdmindetails = () => {
  //   axios.get('http://localhost:8008/admin/').then((response) => {
  //     console.log(response);
  //     setitems(response.data.products)
  //   })
  // }
  useEffect(() => {
    setadminTrue(true)
    // getAdmindetails()

  }, [])
  const logout=()=>{
    axios.get('http://localhost:8008/admin/signout').then((response)=>{
      history.push('/admin')
    })
  }
  return (






    <div>
      <h1>Welcome to Admin Home page</h1>
      <button onClick={logout}>Logout</button>
      
      
        {/* <Table width='100%' striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Product name Name</th>
              <th>Price</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{i.Name}</td>
                <td>{i.Price}</td>
                <td>{i.CreatedBy}</td>
                 
              </tr>
            ))}



          </tbody>
        </Table> */}

      
      {/* <Datatable items={items} /> */}
    </div>
  )
}

export default AdminHome
