import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react'
import { Categories } from '../view/Categories';
import { Products } from '../view/Products';

export const Admin = () => {
  // const logIn = async () => {
  //   if (form.email || form.password){
  //     try{
  //       const res = await backApi.post('auth/account/login/', form);
  //       const token = res.data.token
  //       backApi.defaults.headers.common['Authorization'] = `Token ${token}`
  //       setIsInvalid(false)
  //       setIsOpen(!isOpen)
  //       setIsloggedIn(true)
  //     }
  //     catch(err){
  //       setIsInvalid(true)
  //     }
  //   }
      
  // }

  return (
    <>
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>Categories</Tab>
          <Tab>Products</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Categories />
          </TabPanel>
          <TabPanel>
            <Products />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
