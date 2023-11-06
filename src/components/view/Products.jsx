import React, { useEffect, useState } from 'react'
import { 
	Button,
	Dropdown,
	InlineNotification, 
	Modal, 
	Table, 
	TableBody, 
	TableCell, 
	TableHead, 
	TableHeader, 
	TableRow, 
	TableToolbar, 
	TableToolbarContent, 
	TableToolbarSearch, 
	TextInput, 
	Theme
} from '@carbon/react'
import axios from 'axios';
import './Styles.scss'

export const Products = () => {

	const headers = ['Product', 'Quantity', 'Price']
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [typeForm, setTypeForm] = useState('Create')
	const [form, setForm] = useState({'product':'', 'price':0, 'category':1});
	const [disabled, setDisabled] = useState(true);
	const [showAlert, setShowAlert] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [selected, setSelected] = useState({
		'id': '', 
		'product': '', 
		'quantity': '', 
		'price': ''
	})

	const token = localStorage.getItem('token');

	const handleChange = (e) => {
		const { value } = e.target;
		setSearch(value);
	}

	const handleChangeForm = (e) => {
		const { value, name } = e.target;
		if(value.length === 0){
			setDisabled(true)
		}else{
			setDisabled(false)
		}
		setForm({...form, [name]: value});
	}

	const filter = () => {
		if(search.length === 0){
			getProducts();
		}else{
			setProducts(
				products.filter(product => product.name.toLowerCase() === search.toLocaleLowerCase())
			)
		}
	}

	const openModal = (type) => {
		setIsOpen(!isOpen);
		setTypeForm(type)
	}

	const openModalEdit = (product) => {
		const { id, quantity, price } = product;
		setSelected({id, 'product': product.product, quantity, price});
		openModal('Edit')
	}

	const closeAlert = () => {
		setShowAlert(false);
		setError(false);
	}

	const getCategories = async () => {
		try{
			const header = {'Authorization': `Token ${token}`}
			const res = await axios.get('http://127.0.0.1:8000/api/categories/', { headers: header})
			setCategories(res.data.data)
		}
		catch(err){
			console.log(err)
		}
	}

	const getProducts = async () => {
		try{
			const header = {'Authorization': `Token ${token}`}
			const res = await axios.get('http://127.0.0.1:8000/api/products/', { headers: header})
			setProducts(res.data.data)
			console.log(res.data)
		}catch(err){
			console.log(err)
		}
	}

	const createProduct = async () => {
		try{
			const header = {'Authorization': `Token ${token}`};
			const res = await axios.post('http://127.0.0.1:8000/api/products/', form, { headers: header});
			setShowAlert(true);
			setError(false);
			setIsOpen(!isOpen);
		}catch(err){
			console.log(err)
			setErrorMessage(err.response.data.message)
			setShowAlert(true);
			setError(true);
			setIsOpen(!isOpen);
		}
	}

	const updateProduct = async () => {
		try{
			const header = {'Authorization': `Token ${token}`};
			const res = await axios.patch(`http://127.0.0.1:8000/api/products/${id}/`, form, { headers: header});
			setShowAlert(true);
			setError(false);
			setIsOpen(!isOpen);
		}catch(err){
			console.log(err)
			setErrorMessage(err.response.data.message)
			setShowAlert(true);
			setError(true);
			setIsOpen(!isOpen);
		}
	}

	useEffect(() => {
		getProducts();
		getCategories();
	}, [])
	

  return (
		<>
			<h1 className='title'>Products</h1>
			{
				showAlert && (
					<InlineNotification 
						className='alert' 
						kind={error ? 'error' : 'success'} 
						timeout={30} 
						title={ error ? 'Error' : 'Success'} 
						subtitle={ 
							error ? errorMessage 
							: typeForm === 'Update' ? 'Product updated' 
							: 'New product added.'
						} 
						onCloseButtonClick={closeAlert}
					/>
				)
			}
			<Theme theme='g10'>
				<TableToolbar aria-label="data table toolbar">
					<TableToolbarContent>
						<TableToolbarSearch onChange={handleChange} persistent />
						<Button kind='secondary' onClick={filter}>Search</Button>
						<Button onClick={() => openModal('Create')}>New product</Button>
					</TableToolbarContent>
				</TableToolbar>
				<Table size="lg" useZebraStyles={false} aria-label="sample table">
					<TableHead>
						<TableRow>
							{
								headers.map((header, index) => <TableHeader id={header.key} key={index}>{header}</TableHeader>)
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{
							products.map((product) => 
								<TableRow 
									key={product.id}
									onClick={() => openModalEdit(product)}
								>
										<TableCell key={product.product}>{product.product}</TableCell>
										<TableCell key={product.quantity}>{product.quantity}</TableCell>
										<TableCell key={product.id}>{product.price}</TableCell>
							</TableRow>)
						}
					</TableBody>
				</Table>
			</Theme>
			<Modal
				open={isOpen}
				modalHeading={
					typeForm === 'Create' 
						? "New Product" 
						: "Update Product" 
					}
				modalLabel={
					typeForm === 'Create' 
						? "Add new product"  
						: "Update product" 
					}
				primaryButtonText={
					typeForm === 'Create' 
						? "Create" 
						: "Update" 
					} 
				secondaryButtonText="Cancel"
				onRequestClose={openModal}
				onRequestSubmit={
					typeForm === 'Create' 
					? createProduct
					: updateProduct
				}
				primaryButtonDisabled={disabled}
			>
				<TextInput
					data-modal-primary-focus 
					id="text-input-1" 
					labelText="Product name" 
					placeholder={
						typeForm === 'Create' 
							? 'Product'
							: selected.product
					}
					style={{
						marginBottom: '1rem'
					}}
					name='product'
					value={form.product}
					required
					onChange={handleChangeForm}
				/>
				<TextInput
					data-modal-primary-focus 
					id="text-input-1" 
					labelText="Quantity" 
					placeholder={
						typeForm === 'Create' 
							? 'Quantity'
							: selected.quantity
					}
					style={{
						marginBottom: '1rem'
					}}
					name='quantity'
					value={form.quantity}
					required
					onChange={handleChangeForm}
				/>
				<TextInput
					data-modal-primary-focus 
					id="text-input-1" 
					labelText="Price" 
					placeholder={
						typeForm === 'Create' 
							? 'Price'
							: selected.price
					}
					style={{
						marginBottom: '1rem'
					}}
					name='price'
					value={form.price}
					required
					type='number'
					onChange={handleChangeForm}
				/>
				<Dropdown
					id='category'
					titleText='Category'
					helperText='Select the category'
					items={categories}
					itemToString={category => categories ? category.category : ''}
				/>
			</Modal>
		</>
  )
}
