import { Button, Input } from '@mui/material'
import React from 'react'
import '../../styles/CreateNews.css';

function CreateNews({visible, setVisible}) {

	const enterHandle = () => {
		setVisible(false);
	};
	const declineHandle = () => {
		setVisible(false);
	};

	if(visible) {
		return (
			<form>
				<div className='mainComponent'>
					<div className='contentContainer'>
						<div className='nameNews'>
							<p id='p'>Название новости:</p>
							<textarea maxLength={135} className='inputName'></textarea>
						</div>
						<div className='contentNews'>
							<p id='p'>Содержание:</p>
							<textarea className='inputContent'></textarea>
						</div>
	
						<div className='buttonsContainer'>
							<Button id='button' variant="outlined" onClick={enterHandle}>Готово</Button>
							<Button id='button' variant="outlined" onClick={declineHandle}>Отмена</Button>
						</div>
					</div>
				</div>
			</form>
		)
	}
	else {
		return (
			<div></div>
		);
	}

	
}

export default CreateNews