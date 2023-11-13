import React, { useEffect, useState } from 'react'
import { 
  Button, 
  Form, 
  Select, 
  SelectItem, 
  TextInput 
} from '@carbon/react';
import {useLocation, useNavigate} from 'react-router-dom';
import { backApi } from '../../api/api'

export const Product = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const token = localStorage.getItem('token')
  const config = {
    headers : {
      Authorization: `Token ${token}`
    }
  };

  const [categories, setCategories] = useState([]);
  const [ingredient, setIngredient] = useState({});
  const [form, setForm] = useState({
    product,
    'price': product.price,
    'category': product.category
  })

  const getBack = () => {
    navigate('/admin')
  }

  const getCategories = async () => {
    try{
			const res = await backApi.get('api/categories/', config)
			setCategories(res.data.data)
		}
		catch(err){
			console.log(err)
		}
  }

  const getProduct = async () => {
    try{
      const res = await backApi.get(`api/products/${id}/product/`, config)
			setProduct(res.data.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form, 
      [name]: value
    });
  };

  useEffect(()=>{
    getProduct();
    getCategories();
  },[])

  return (
    <>
      <Button
        className='button'
        kind="tertiary"
        onClick={() => getBack()}
      >
        Get Back
      </Button>
      <h1>{product.product}</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          className='input'
          id="text-input-1" 
          type="number" 
          labelText="Quantity" 
          helperText="Product quantity available"
          name='quantity'
          value={product.quantity}
          readOnly={true}
        />
        <TextInput
          className='input'
          id="text-input-1" 
          type="number" 
          labelText="Price" 
          helperText="Product cost"
          name='price'
          value={form.price}
          onChange={handleChange}
        />
        <Select
          className='input'
					id="select-1" 
					labelText="Category" 
					helperText="Select a category"
          defaultValue='Express'
				>
					<SelectItem
						value=''
						text=''
					/>
					{
						categories && categories.map((category, index) => {
							return <SelectItem
								key={index}
								value={category.id}
								text={category.category}
							/>
						})
					}
				</Select>
        <Button 
          className='button-2'
          type='submit'
        >
          Submit
        </Button>
      </Form>
    </>
  )
}
