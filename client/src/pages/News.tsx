import React, {useEffect, useState} from 'react';
import MenuComponent from '../components/MenuComponent';
import { BottomNavigation, Button, Pagination } from "@mui/material";
import CreateNews from '../components/NewsComponents/CreateNews';
import $api from '../http';
import NewsList from '../components/NewsComponents/NewsList';

function News() {

	const [totalPages, setTotalPages] = useState(10);
	const [modal, setModal] = useState(false);
	const [news, setNews] = useState([]);

	useEffect(() => {
		$api.get('http://localhost:5000/news/getnews')
		.then(response => {
			setNews(response.data);
			console.log(response.data);
		})
		.catch(error => console.log(error))
	}, [])

	return (
		<div>
			<MenuComponent></MenuComponent>

			<div>
				<Button variant="contained" onClick={() => setModal(true)}>Добавить новость</Button>
			</div>

			<CreateNews visible={modal} setVisible={setModal}></CreateNews>

			{/* <NewsList news={news}></NewsList> */}
			
			<Pagination disabled={modal} style={{paddingTop: 15}} count={totalPages} onChange={e => console.log(123)} color="primary" size="large"></Pagination>
		</div>
	)
}

export default News