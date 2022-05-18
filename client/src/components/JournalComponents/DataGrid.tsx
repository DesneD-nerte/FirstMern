import React from 'react';
import { DataGrid, GridCellParams, GridColumns, ruRU } from '@mui/x-data-grid';
import CustomToolBar from './CustomToolBar';
import { Marks } from '../../../types';
import moment from 'moment';
import axios from 'axios';
import RoleService from '../../services/RoleService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const endpoint = process.env.REACT_APP_SERVICE_URI;

moment.locale('ru');  

type DataGridProps = {
	marks: Array<Marks>,
}

export default function BasicEditingGrid(dataGridProps: DataGridProps) {
	const myData = useSelector((state: RootState) => ({...state.profileData}))

	const {marks} = dataGridProps;

	const columns: GridColumns = [
		{
			field: 'user',
			headerName: "ФИО",
			editable: false,
			width: 300,
			valueFormatter: ({value}) => value.name
		},
	]

	marks.forEach((oneUserMarks) => {
		if(oneUserMarks) {
			oneUserMarks.id = oneUserMarks._id;
		}
	});

	const oneUserToFill = marks.find(elem => elem);
	oneUserToFill?.allCurrentLessons.forEach((oneMark, index) => {
		columns.push({
			field: oneMark.currentLesson._id.toString(),
			headerName: moment(oneMark.currentLesson.beginDate).format('LL'),
			// editable: true,
			editable: RoleService.CheckJournalRole(myData.roles),
			width: 150,
			valueGetter: (params) => params.row.allCurrentLessons[index].mark,
			valueSetter: (params) => {
				const result = params.value.toString()
				params.row.allCurrentLessons[index].mark = result;
	
				return {...params.row};
			}})
	})

	const handleCellEdit = async(params: GridCellParams) => {
		await axios.put(`${endpoint}/marks/updatecurrentlesson`, params.row);
	}

	return (
		<div>
			<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={marks}
					columns={columns}
					isCellEditable={(params) => params === params}
					rowsPerPageOptions={[10, 20, 50, 100]}
					experimentalFeatures={{ newEditingApi: true }}
					components={{
						Toolbar: function() {
							if(marks.length > 0)
								return CustomToolBar(true);
							else 
								return CustomToolBar(false);
						}
					}}
					localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
					onCellEditStop={handleCellEdit}
				/>
			</div>
		</div>
	);
}
