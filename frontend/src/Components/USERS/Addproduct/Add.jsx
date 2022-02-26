import React, { useState,useEffect } from 'react'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router'

function Add() {
    const history=useHistory()
    const [image, setimage] = useState()
    const [isloading, setisloading] = useState(false)
    const [url, seturl] = useState()
    const [input, setinput] = useState({
        name: '',
        category: '',
        price: null,
        description: ''
    })
    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const handleAdd = async () => {
         setisloading(true)
        console.log('handleAdd Working');
        const formdata = new FormData()

        formdata.append('file', image)
        formdata.append('upload_preset', 'llcm6mzz')
       await axios.post('https://api.cloudinary.com/v1_1/di0bgblj1/image/upload ', formdata).then((response) => {
            console.log(response);
            seturl(response.data.url)
        })
        url && await axios.post('http://localhost:8008/addproduct', { input: input,url:url }).then((res) => {
            console.log(res);
            res.data.vibe && alert('successfuly added')
            setimage()
            setisloading(false)
            history.push('/')
        })

        
    }
    const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    history.push('/');
  }
  const handleShow = () => setShow(true);
  useEffect(() => {
    handleShow()
  }, [])

  return (
    <div>
        <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{backgroundColor:"blue"}}>
          <Modal.Title >Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="body">
                    <div><input type="text" onChange={handleChange} name='name' placeholder='Product name' /></div><br/>
                  
                  <div>  <select onChange={handleChange} name="category" title="category">
                  <option value="">...</option>                
            <option value="fruits">Fruit</option>
            <option value="vegetables">Vegetable</option>
            <option value="cereals">Cereal</option>
          </select></div>
          <br/>
                    <div><input type="text" onChange={handleChange} name='price' placeholder='Product Price' /></div>
                    <br/>

                   <div> <input type="text"  onChange={handleChange} name='description' placeholder='Product Description' /></div><br/>
                   <div> <input accept="image/png" onChange={(e) => setimage(e.target.files[0])} type="file" /></div>


                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={handleAdd}>{isloading ? 'confirm':'Add'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Add