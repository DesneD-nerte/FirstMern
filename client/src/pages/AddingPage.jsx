import React, { useState, useEffect, useContext } from 'react';
import MenuComponent from '../components/MenuComponent';
import { Workbook } from "igniteui-react-excel";
import { WorkbookSaveOptions } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { ExcelUtility } from "./../services/ExcelUtility";
import { Input, Button, CircularProgress } from '@mui/material';
import ExcelUsers from '../services/ExcelUsers';
import axios from 'axios';
import ExcelTable from '../components/ExcelTable';
import AlertDialogSlide from '../components/AddingUsersComponents/AlertDialogSlide';
import '../styles/AddingPage.css';
import '../styles/MyProfile.css'

const endpoint = process.env.REACT_APP_SERVICE_URI;

export default function AddingPage () {
    const [workbook, setWorkBook] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [arrayUsers, setArrayUsers] = useState([{name: "Empty"}]);
    
    const handleSetFile = async (e) => {
        console.log(e.target.files);
        const filePath = e.target.value;
        let fileName = filePath.replace(/.*[\/\\]/, '');
        fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        
        const myFileExcel = e.target.files[0];
        myFileExcel.shortName = fileName; 
        
        const loadedWorkBook = await ExcelUtility.load(myFileExcel);
        setWorkBook(loadedWorkBook);

        const arrayUsers = ExcelUsers.createArrayUsers(loadedWorkBook);
        axios.post(`${endpoint}/api/auth/registration/arrayusers`, arrayUsers)
            .then(res => {
                const responseArrayUsers = res.data;
                setArrayUsers(responseArrayUsers);
            })
            .catch(err => console.log(err));
    }

    const saveWorkBook = () => {
        if(workbook) {
            const filledWorkBook = ExcelUsers.fillArrayUsers(workbook, arrayUsers);
            ExcelUtility.save(filledWorkBook, `Новые пользователи:  ${new Date()}`);
        }
        else {
            setDisplayAlertDialog(true);
        }
    }

    useEffect(() => {
        setIsLoading(!isLoading);
    }, [workbook])

    useEffect(() => {
        setIsLoading(false);
    }, [arrayUsers])

    const [dispayAlertDialog, setDisplayAlertDialog] = useState(false);

    return(
        <div>
            <MenuComponent></MenuComponent>
            <div className='addingComponent'>
                <h1>Добавление пользователей</h1>
                <div style={{marginBottom: 10}}>
                    <label htmlFor="upload-excel" style={{width: '100%'}}>
                        <Input type="file" inputProps={{accept: [".xlsx", ".xls"]}}
                            id="upload-excel"
                            style={{display: "none"}}
                            onChange={(e) => handleSetFile(e)}
                            onClick={(e) => e.target.value = null}/>
                        <Button component="span" style={{padding: '5px 15px 5px 15px', width: '100%', fontSize: 16}}>
                            Загрузить Excel
                        </Button>{" "}
                    </label>
                </div>
                <div>
                    {isLoading === false
                        ?
                        <div>
                            <ExcelTable arrayUsers={arrayUsers}></ExcelTable>

                            <div style={{marginTop: 10}}>
                                <Button onClick={saveWorkBook} style={{width: '100%', fontSize: 16}}>
                                    Сохранить Excel файл
                                </Button>
                            </div>
                        </div>
                        :
                        <div className='loadingProfile'>
                            <CircularProgress size={100}></CircularProgress>
                        </div>
                    }
                </div>
            </div>
            {
                dispayAlertDialog === true &&
                    <AlertDialogSlide displayAlertDialog setDisplayAlertDialog={setDisplayAlertDialog}></AlertDialogSlide>
            }
        </div>
    );
}