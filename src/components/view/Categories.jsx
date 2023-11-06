import { 
	Button,
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
	Theme,
} from '@carbon/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Styles.scss'

export const Categories = () => {

	const headers = ['Id', 'Category'];
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [isOpen, setIsOpen] = useState(false)
	const [form, setForm] = useState({'category':''})
	const [error, setError] = useState(false);
	const [showAlert, setShowAlert] = useState(false)
	const [disabled, setDisabled] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')
	const [isSelected, setIsSelected] = useState({'id':0, 'category':''})
	const [typeForm, setTypeForm] = useState('Create')

	const token = localStorage.getItem('token')

	const getCategories = async () => {
		try{
			const header = {'Authorization': `Token ${token}`}
			const res = await axios.get('http://127.0.0.1:8000/api/categories/', { headers: header})
			console.log(res.data)
			setCategories(res.data.data)
		}
		catch(err){
			console.log(err)
		}
	}

	const handleChange = (e) => {
		const { value } = e.target
		setSearch(value)
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

	const openModalEdit = (category, id) => {
		setIsSelected({'id':id, 'category': category})
		openModal('Update')
	}

	const filter = () => {
		if(search.length === 0){
			getCategories()
		}else{
			setCategories(
				categories.filter(category => category.category.toLowerCase() === search.toLowerCase())
			)
		}
	}

	const openModal = (type) => {
		setTypeForm(type)
		setIsOpen(!isOpen)
		setForm({'category':''})
		setDisabled(true)
	}

	const createCategory = async () => {
		try{
			const header = {'Authorization': `Token ${token}`}
			const res = await axios.post('http://localhost:8000/api/categories/', form, { headers : header })
			setShowAlert(true)
			setError(false)
			setIsOpen(!isOpen)
		}
		catch(err){
			setError(true)
			setShowAlert(true)
			setErrorMessage(err.response.data.message)
			setIsOpen(!isOpen)
		}
	}

	const updateCategory = async () => {
		try{
			const header = {'Authorization': `Token ${token}`}
			const id = isSelected.id
			const res = await axios.put(`http://127.0.0.1:8000/api/categories/${id}/`, form, { headers : header })
			setShowAlert(true)
			setIsOpen(!isOpen)
			setError(false)
		}
		catch(err){
			setErrorMessage(err.response.data.message)
			setShowAlert(true)
			setError(true)
			setIsOpen(!isOpen)
		}
	}

	const closeAlert = () => {
		setShowAlert(false)
		setError(false)
	}

	useEffect(() => {
		getCategories()
	}, [isOpen])

  return (
		<>
    	<h1 className='title'>Categories</h1>
			{
				showAlert && (
					<InlineNotification 
						className='alert' 
						kind={error ? 'error' : 'success'} 
						timeout={30} 
						title={ error ? 'Error' : 'Success'} 
						subtitle={ 
							error ? errorMessage 
							: typeForm === 'Update' ? 'Category updated' 
							: 'New category added.'
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
						<Button onClick={() => openModal('Create')}>New category</Button>
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
							categories.map((category) => <TableRow 
																						key={category.id}
																						onClick={() => openModalEdit(category.category, category.id)}
																					>
								{
									Object.keys(category).map(data => {
										return <TableCell key={data}>{category[data]}</TableCell>;
									})
								}
							</TableRow>)
						}
					</TableBody>
				</Table>
			</Theme>
			<Modal
				open={isOpen}
				modalHeading={
					typeForm === 'Create' 
						? "New Category" 
						: "Update Category" 
					}
				modalLabel={
					typeForm === 'Create' 
						? "Add new category"  
						: "Update Category" 
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
					? createCategory
					: updateCategory
				}
				primaryButtonDisabled={disabled}
			>
				<TextInput 
					data-modal-primary-focus 
					id="text-input-1" 
					labelText="Category name" 
					placeholder={
						typeForm === 'Create' 
							? 'Category'
							: isSelected.category
					}
					style={{
						marginBottom: '1rem'
					}}
					name='category'
					value={form.category}
					required
					onChange={handleChangeForm}
				/>
			</Modal>
		</>
  )
}
