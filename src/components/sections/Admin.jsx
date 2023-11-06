import React, { useState } from 'react'
import { Modal, Tab, TabList, TabPanel, TabPanels, Tabs, TextInput } from '@carbon/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Categories } from '../view/Categories';
import { Products } from '../view/Products';

export const Admin = () => {

  const navigate = useNavigate();
  const formClear = {
    'email': '',
    'password': ''
  }

  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState(formClear)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isLoggedIn, setIsloggedIn] = useState(false)

  const handleChange = (e) => {
    const {value, name} = e.target
    setForm({...form, [name]: value})
  }

  const logIn = async () => {
    if (form.email || form.password){
      try{
        const res = await axios.post('http://localhost:8000/auth/account/login/', form);
        localStorage.setItem('token', res.data.token)
        setIsInvalid(false)
        setIsOpen(!isOpen)
        setIsloggedIn(true)
      }
      catch(err){
        setIsInvalid(true)
      }
    }
      
  }

  const openModal = () => {
    setIsOpen(!isOpen)
    setForm(formClear)
    navigate('/sales')
  }

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading="Log In" 
        modalLabel="Admin panel" 
        primaryButtonText="Access" 
        secondaryButtonText="Cancel"
        onRequestClose={openModal}
        onRequestSubmit={logIn}
      >
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
      </Modal>
      {
        isLoggedIn && (
          <div>
            <Tabs>
              <TabList aria-label="List of tabs" contained>
                <Tab>Categories</Tab>
                <Tab>Products</Tab>
                <Tab>Ingredients</Tab>
             </TabList>
             <TabPanels>
                <TabPanel>
                  <Categories />
                </TabPanel>
                <TabPanel>
                  <Products />
                </TabPanel>
                <TabPanel>Ingredients</TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        )
      }
    </>
  )
}
