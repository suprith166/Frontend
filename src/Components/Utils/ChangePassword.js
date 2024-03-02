import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { baseUrl } from '../../App';

function ChangePassowrd({show, toggle, usertype}) {

    const user = JSON.parse(sessionStorage.getItem('user'))
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    function handleSubmit(e)
    {
        e.preventDefault();
        if(password!==cpassword)
        {
            toast.error("Confirm password mismatched")
            return
        }
        const data ={
            password:password
        }
        const api = usertype==="admin" ? axios.put(baseUrl+`/Admin/Changepass/${user.adminid}`,data) : axios.put(baseUrl+`/Emp/Changepass/${user.empid}`,data)
        api.then(res=>{
            toast.success(res.data)
            toggle()
            setCPassword("")
            setPassword("")
        })
        .catch(err=>{
            toast.error(err.response? err.response.data : "Something went wrong")
        })
    }

    function close(){
        toggle()
        setCPassword("")
        setPassword("")
    }

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e)=>handleSubmit(e)}> 
        <Modal.Body>
            <Form.Group>
                <Form.Label htmlFor="exampleInputEmail1">Password</Form.Label>
                <Form.Control type='password' value={password} required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="exampleInputEmail1">Confirm Password</Form.Label>
                <Form.Control type='password' value={cpassword} required onChange={(e)=>setCPassword(e.target.value)}/>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ChangePassowrd;