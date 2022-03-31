import React, { Dispatch, SetStateAction } from 'react';
import '../../styles/OneNews.css';
import moment from 'moment';
import 'moment/min/locales';
import { News } from '../../../types'
import { Checkbox } from '@mui/material';
import { array } from 'prop-types';

moment.locale('ru');  

interface myCallbackType { (myArray: React.SetStateAction<News[]>): Array<News> }

type OneNewsProps = {
	news: News,
	deleteMode: boolean,
	arrayToDelete: Array<News>
	setArrayToDelete: Dispatch<SetStateAction<News[]>>
}

const OneNews = (props: OneNewsProps) => {

	const {name, content, createdAt} = props.news;
	let {arrayToDelete, setArrayToDelete} = props;

	const createdDate = moment(createdAt).format('LL');

	const handleChange = () => {
		if(!arrayToDelete.some(item => item.name === name && item.content === content && item.createdAt === createdAt)) {
			setArrayToDelete([...arrayToDelete, props.news]);
		} else {
			let transitArrayToDelete = arrayToDelete.filter(item => props.news.name !== item.name && props.news.content !== item.content && props.news.createdAt !== item.createdAt);
			setArrayToDelete(transitArrayToDelete);
		}
	}

	return (
		<div className='mainOneNewsContainer'>
			{props.deleteMode
				?
					<div className='checkboxContainer'>
						<Checkbox defaultChecked={false} onChange={handleChange}/>
					</div>
				:
					null
			}
			
			<div className='headOneNewsContainer'>
				<div className='nameText'>{name}</div>
				<div>{createdDate}</div>
			</div>

			<div className='contentOneNewsContainer'>
				{content}
			</div>
		</div>
	)
}

export default OneNews