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
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="body">
                    <input type="text" onChange={handleChange} name='name' placeholder='Product name' /><br/>
                    <input type="text" onChange={handleChange} name='category' placeholder='Product Category' /><br/>
                    <input type="text" onChange={handleChange} name='price' placeholder='Product Price' /><br/>

                    <input type="text"  onChange={handleChange} name='description' placeholder='Product Description' />
                    <input accept="image/png" onChange={(e) => setimage(e.target.files[0])} type="file" />


                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={handleAdd}>{isloading ? 'Wait....':'Add'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Add