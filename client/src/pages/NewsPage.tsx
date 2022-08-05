import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import NewsList from "../components/NewsComponents/NewsList";
import ControlPanel from "../components/NewsComponents/ControlPanel";
import "../styles/NewsPage.css";
import { useNews } from "../hooks/useNews";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { GetNews } from "../store/news/newsData/newsDataThunks";
import { setPageNews } from "../store/news/newsData/newsReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

function NewsPage() {
    const { news, page, limit, range, isLoading } = useSelector(
        (state: RootState) => state.newsData
    );

    const dispatch = useDispatch<AppDispatch>();

    const searchedNews = useNews();

    useEffect(() => {
        dispatch(GetNews(page, limit));
    }, [page, limit]);

    const handleChangePage = (event, newNumberPage) => {
        dispatch(setPageNews(newNumberPage));
    };

    return (
        <div className="newsComponent">
            <div className="mainContainer">
                <div className="flexContainer">
                    <div className="newsContainer">
                        <NewsList news={searchedNews} />

                        {/* <div className='separatorColumn'></div> */}

                        <ControlPanel />
                    </div>

                    <Pagination
                        style={{ paddingTop: 15, paddingBottom: 15 }}
                        count={Math.ceil(range / limit)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        size="large"
                    />
                </div>
            </div>
        </div>
    );
}

export default NewsPage;
