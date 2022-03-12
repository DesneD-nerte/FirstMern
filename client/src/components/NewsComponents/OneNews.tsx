import React from 'react';
import '../../styles/OneNews.css';

type News = {
	name: String,
	content: String,
	createdAt: Date	
}

const OneNews = (props: News) => {

	const {name, content, createdAt} = props;

	return (
		<div className='mainOneNewsContainer'>
			<div className='headOneNewsContainer'>
				<div>{name}</div>
				<div>{createdAt}</div>
			</div>

			<div className='contentOneNewsContainer'>
				{content}
			</div>
		</div>
	)
}

export default OneNews