import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import $api from '../../http/index.js';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type propsAlert = {
    displayAlertDialog: boolean,
    setDisplayAlertDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlertDialogSlide(props: propsAlert) {
    const {displayAlertDialog, setDisplayAlertDialog} = props;

    const handleClose = () => {
        setDisplayAlertDialog(false);
    };

    const handleDownload = () => {
        $api.get('http://localhost:5000/files/getExcelTemplate', {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/xlsx'
            }
        })
        .then((response) => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Шаблон для добавления пользователей.xlsx');
            document.body.appendChild(link);
            link.click();
        })
    }

    return (
        <div>
        <Dialog
            open={displayAlertDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Необходимо загрузить Excel файл на обработку"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Скачайте шаблон файла, заполните необходимые поля один за одним. Поля логина и пароля сгенерируются автоматически
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDownload}>Скачать шаблон</Button>
            <Button onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}