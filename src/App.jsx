import React, { useState } from 'react'
import { Button, Form, Modal, TextInput } from '@carbon/react';
import { AdminRouter } from './routes/AdminRouter';
import { UserRouter } from './routes/UserRouter';
import { backApi } from './api/api'
import './App.scss';
import './styles.scss';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

const App = () => {

  const formClear = {
    'email': '',
    'password': ''
  }

  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState(formClear)
  const [isInvalid, setIsInvalid] = useState(false)
  const [user, setUser] = useState({})

  const handleChange = (e) => {
    const {value, name} = e.target
    setForm({...form, [name]: value})
  }

  const logIn = async (e) => {
    if (form.email || form.password){
      try{
        e.preventDefault()
        const res = await backApi.post('auth/account/login/', form);
        const token = res.data.token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        setUser(res.data.user)
        setIsInvalid(false)
        setIsOpen(!isOpen)
      }
      catch(err){
        setIsInvalid(true)
      }
    }
    else{
      setIsInvalid(true)
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading="Log In" 
        passiveModal
        preventCloseOnClickOutside={true}
      >
        <Form onSubmit={(e) => logIn(e)}>
          <TextInput 
            data-modal-primary-focus 
            id="text-input-1" 
            labelText="Email" 
            placeholder="name@example.com" 
            style={{
              marginBottom: '1rem'
            }}
            name='email'
            value={form.email}
            required
            onChange={handleChange}
            invalid={isInvalid}
          />
          <TextInput 
            data-modal-primary-focus 
            id="text-input-1" 
            labelText="Password" 
            placeholder="********" 
            type='password'
            required
            name='password'
            value={form.password}
            onChange={handleChange}
            invalid={isInvalid}
          />
          <Button size='lg' type="submit" className='button-modal'>
            Submit
          </Button>
        </Form>
      </Modal>
      <AuthContext.Provider value={user}>
        {
          user.is_superuser ? (
            <AdminRouter />
          ) : (
            <UserRouter />
          )
        }
      </AuthContext.Provider>
    </>
  );
};

export default App