import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { User } from "../../types";

type InfoObjectRoles = {
    _id: String;
    value: String
}

type InfoObject = {
    _id: String;
    name: String
}

type UserObject = {
    _id?: String | undefined;
    username: String;
    password: String;
    name: String;
    roles?: Array<InfoObjectRoles>;
    email: String;
    imageUri?: String ;
    faculties?: Array<InfoObject>;
    departments?: Array<InfoObject>;
    groups?: Array<InfoObject>;
}

type propsType = {
    arrayUsers: Array<UserObject>
}

export default function ExcelTable(props: propsType) {
    console.log(props.arrayUsers)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Имя</TableCell>
                        <TableCell align="center">Роли</TableCell>
                        <TableCell align="center">Почта</TableCell>
                        <TableCell align="center">Логин</TableCell>
                        <TableCell align="center">Пароль</TableCell>
                        <TableCell align="center">Факультет</TableCell>
                        <TableCell align="center">Группа</TableCell>
                        <TableCell align="center">Кафедра</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { 
                        props.arrayUsers.map((row: UserObject) => (
                            <TableRow
                                key={row._id as React.Key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.roles?.map(role => (role.value + ' '))}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.username}</TableCell>
                                <TableCell align="center">{row.password}</TableCell>
                                <TableCell align="center">{row.faculties?.map(faculty => (faculty.name + ' '))}</TableCell>
                                <TableCell align="center">{row.groups?.map(group => (group.name + ' '))}</TableCell>
                                <TableCell align="center">{row.departments?.map(department => (department.name + ' '))}</TableCell>
                            </TableRow>
                        ))
 
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}