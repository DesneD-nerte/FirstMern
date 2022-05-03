import React, {useState, useEffect, useRef} from 'react';
import { DataGrid, GridCellParams, GridColumns, GridRowsProp, GridToolbar, ruRU } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import CustomToolBar from './CustomToolBar';
import { CurrentLesson, Marks } from '../../../types';
import moment from 'moment';
import $api from '../../http';

moment.locale('ru');  

type DataGridProps = {
	marks: Array<Marks>,
}

export default function BasicEditingGrid(dataGridProps: DataGridProps) {
	const {marks} = dataGridProps;

	const columns: GridColumns = [
		{field: 'user', headerName: "ФИО", editable: false, width: 300, valueFormatter: ({value}) => value.name},
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
			editable: true,
			width: 150,
			valueGetter: (params) => params.row.allCurrentLessons[index].mark,
			valueSetter: (params) => {
				const result = params.value.toString()
				params.row.allCurrentLessons[index].mark = result;
	
				return {...params.row};
			}})
	})

	const handleCellEdit = async(params: GridCellParams) => {
		await $api.put('http://localhost:5000/api/marks/updatecurrentlesson', params.row);
	}

	return (
		<div>
			<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={marks}
					columns={columns}
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
			<div>
				{/* <Button variant="outlined" onClick={handleClick}>Проверить</Button> */}
			</div>
		</div>
	);
}

const rows: GridRowsProp = [
	{
		id: '6259e387c80d0cf7b1205127',
		user: {
            departments: [],
            _id: "61dd80af4b4cec30d30ab908",
            username: "admin",
            roles: [
                "61dd81444b4cec30d30ab909",
                "61dd81694b4cec30d30ab90a"
            ],
            email: "admin.@gmail.com",
            name: "Александр Ершов Владимирович",
            imageUri: "http://localhost:5000/api/users/61dd80af4b4cec30d30ab908/avatar/61dd80af4b4cec30d30ab908.jpeg",
            faculties: [
                "62481fd240b1e9376a4072a7"
            ],
            groups: [
                "62481fa940b1e9376a4072a1"
            ]
        },
		lesson: '61fe6a27542d44bd224d2c46',
		allCurrentLessons: [
			{
				currentLesson: {
					_id: "62449b5e8f4866349f18e760",
					name: {
						"_id": "61fe6a27542d44bd224d2c46",
						"name": "Physics"
					},
					teacher: {
						groups: [],
						_id: "61fe65bca9952e94f6a9321b",
						username: "teacheruser",
						roles: [
							"6248912a40b1e9376a4072ca"
						],
						email: "teacheruser@gmail.com",
						name: "Евгений Тарасов Борисович",
						imageUri: "http://localhost:5000/api/users/61fe65bca9952e94f6a9321b/avatar/61fe65bca9952e94f6a9321b.jpeg",
						departments: [
							"61fe4006cf506002846acd42"
						],
						faculties: [
							"62481fd240b1e9376a4072a7",
							"624f0f2ff14b9d4bd4c63964"
						]
					},
					classroom: {
						_id: "62449b238f4866349f18e757",
						name: "445"
					},
					group: {
						_id: "62481fa940b1e9376a4072a1",
						name: "БПИ-411"
					},
					beginDate: "2022-02-20T01:00:00.000Z",
					endDate: "2022-02-20T02:30:00.000Z"
				},
				mark: '5',
			},
			{
				currentLesson: {
					_id: "62449b5e8f4866349f18e761",///////последняя цифра - 0
					name: {
						"_id": "61fe6a27542d44bd224d2c46",
						"name": "Physics"
					},
					teacher: {
						groups: [],
						_id: "61fe65bca9952e94f6a9321b",
						username: "teacheruser",
						roles: [
							"6248912a40b1e9376a4072ca"
						],
						email: "teacheruser@gmail.com",
						name: "Евгений Тарасов Борисович",
						imageUri: "http://localhost:5000/api/users/61fe65bca9952e94f6a9321b/avatar/61fe65bca9952e94f6a9321b.jpeg",
						departments: [
							"61fe4006cf506002846acd42"
						],
						faculties: [
							"62481fd240b1e9376a4072a7",
							"624f0f2ff14b9d4bd4c63964"
						]
					},
					classroom: {
						_id: "62449b238f4866349f18e757",
						name: "445"
					},
					group: {
						_id: "62481fa940b1e9376a4072a1",
						name: "БПИ-411"
					},
					beginDate: "2022-03-02T01:00:00.000Z",
					endDate: "2022-03-02T02:30:00.000Z"
				},
				mark: '4',
			}
		]
	}
]
