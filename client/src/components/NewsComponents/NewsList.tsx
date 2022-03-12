import React from 'react'
import OneNews from './OneNews'

type News = {
	name: String,
	content: String,
	createdAt: Date	
}

type newsArrayProps = {
	news: Array<News>
};

const NewsList = (props: newsArrayProps) => {
	const {news} = props;

	return (
		<div>
			{
				news.map((oneNews, index) => {
					<OneNews {...oneNews}></OneNews>
				})
			}
		</div>
	)
}

export default NewsList