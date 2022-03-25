import React, { Dispatch, SetStateAction } from 'react';
import OneNews from './OneNews';
import '../../styles/NewsList.css';
import { News } from '../../types'

interface myCallbackType { (myArray: React.SetStateAction<News[]>): Array<News> }

type newsArrayProps = {
	news: Array<News>,
	deleteMode: boolean,
	arrayToDelete: Array<News>,
	setArrayToDelete: Dispatch<SetStateAction<News[]>>
};

const NewsList = (props: newsArrayProps) => {
	const {news, deleteMode, arrayToDelete, setArrayToDelete} = props;

	return (
		<div className="newsListComponent">
			<>
			{news.length !== 0
				?
				<div>
					{news.map((oneNews, index) => 
						<div>
							<OneNews deleteMode={deleteMode} news={{...oneNews}} arrayToDelete={arrayToDelete} setArrayToDelete={setArrayToDelete}/>
							<div className='separator'></div>
						</div>
					)}
				</div>
				:
				<div>
					<h1>Новости отсутствуют</h1>
				</div>
			}
			</>
		</div>
	)
}

export default NewsList