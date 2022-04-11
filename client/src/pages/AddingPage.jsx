import React, { useState, useEffect, useContext } from 'react';
import MenuComponent from '../components/MenuComponent';
import { Workbook } from "igniteui-react-excel";
import { WorkbookSaveOptions } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { ExcelUtility } from "./../services/ExcelUtility";
import { Input, Button } from '@mui/material';



export default function AddingPage () {
    const [workbook, setWorkBook] = useState();
    //var workbook = ExcelUtility.load(file);
    //await ExcelUtility.save(workbook, file.shortName);
    // console.log(workbook);
    
    const handleSetFile = async (e) => {
        const filePath = e.target.value;
        let fileName = filePath.replace(/.*[\/\\]/, '');
        fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        
        const myFileExcel = e.target.files[0];
        myFileExcel.shortName = fileName; 
        
        const workbook = await ExcelUtility.load(myFileExcel);
        // setFile(myFileExcel);
        setWorkBook(workbook);
    }

    const saveWorkBook = () => {
        console.log(workbook.worksheets(0).rows(1).cells(1).value)
        //ExcelUtility.save(workbook, `Новые пользователи:  ${new Date()}`);
    }

    return(
        <div>
            <MenuComponent></MenuComponent>
            <div>
                <h1>Добавление пользователей</h1>
                    <div>
                        <label htmlFor="upload-excel" style={{width: '100%'}}>
                            <Input type="file" inputProps={{accept: [".xlsx", ".xls"]}}
                                id="upload-excel"
                                style={{display: "none"}}
                                onChange={(e) => handleSetFile(e)}/>
                            <Button component="span" style={{padding: '5px 15px 5px 15px', width: '100%'}}>
                                Загрузить Excel
                            </Button>{" "}
                        </label>
                    </div>
                    <div>
                        <Button onClick={saveWorkBook}>
                            Сохранить Excel файл
                        </Button>
                    </div>
            </div>
        </div>
    );
}