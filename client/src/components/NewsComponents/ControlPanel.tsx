import { Button, ButtonGroup, FormControlLabel, FormGroup, Icon, Input, Switch, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import OneNews from './OneNews';
import '../../styles/ControlPanel.css';
import $api from '../../http';

const ControlPanel = ({arrayToDelete, filter, setFilter, limit, setLimit, deleteMode, setDeleteMode, setModal}) => {

	const handleChange = (event, newLimit) => {
		if (newLimit !== null) {
			setLimit(newLimit);
		}
	}

	const handleDelete = () => {
		$api.delete('http://localhost:5000/news/deletenews', {data: {oldNews: arrayToDelete}})
		.then(response => {
			setDeleteMode(false);
		})
	}

	return (
		<div className="panelComponent">
			<div className='mainPanelContainer'>
				<TextField
					style={{width: '85%', alignSelf: 'center'}}
					value={filter.query}
					onChange={e => setFilter({...filter, query: e.target.value})}
					id="input-with-icon-textfield"
					label="Поиск"
					disabled={deleteMode}
					InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon/>
						</InputAdornment>
					),
					}}
					variant="outlined"
				/>
				<div className='mainPanelLimitOptions'>
					<label>Показывать по:</label>
					<ToggleButtonGroup
						value={limit}
						onChange={handleChange} 
						color="primary"
						style={{marginTop: 10}}
						exclusive
						fullWidth
						disabled={deleteMode}
					>
						<ToggleButton value={5}>5</ToggleButton>
						<ToggleButton value={10}>10</ToggleButton>
						<ToggleButton value={25}>25</ToggleButton>
					</ToggleButtonGroup>
				</div>

				<div className='deleteContainer'>
					<FormControlLabel control={<Switch value={deleteMode} checked={deleteMode} onChange={() => setDeleteMode(!deleteMode)} defaultChecked={false}/>} label="Режим удаления" />
					<Button variant="contained" onClick={handleDelete} disabled={!deleteMode}>Удалить выделенное</Button>
				</div>

				<div className='buttonAddNews'>
					<Button variant="contained" disabled={deleteMode} onClick={() => setModal(true)}>Добавить новость</Button>
				</div>
			</div>
		</div>
	)
}

export default ControlPanel