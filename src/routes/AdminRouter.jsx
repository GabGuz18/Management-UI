import React from 'react';
import { Grid, Column, Content } from '@carbon/react';
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar';
import { Sales } from '../components/sections/Sales';
import { Purchase } from '../components/sections/Purchase';
import { Admin } from '../components/sections/Admin';

export const AdminRouter = () => {
  return (
    <>
      <Navbar />
      <Content>
        <Grid>
          <Column lg={{ span: 13, offset: 3 }} md={8} sm={4}>
            <Routes>
              <Route path='/sales' element={<Sales />} />
              <Route path='/purchase' element={<Purchase />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </Column>
        </Grid>
      </Content>
    </>
  )
}
