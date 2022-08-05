import React from "react";
import "../../styles/OneNews.css";
import moment from "moment";
import "moment/min/locales";
import { News } from "../../../types";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ToggleNews } from "../../store/news/newsDelete/newsDeleteThunk";

moment.locale("ru");

type OneNewsProps = {
    news: News;
};

const OneNews = (props: OneNewsProps) => {
    const { newsDelete, deleteMode } = useSelector(
        (state: RootState) => state.newsDeleteData
    );
    const dispatch = useDispatch<AppDispatch>();
    const { news } = props;

    const createdDate = moment(news.createdAt).format("LL");

    const handleChange = () => {
        dispatch(ToggleNews(newsDelete, news));
    };

    const defaultValueCheckBox = () => {
        if (newsDelete.find((oneNews) => oneNews._id == news._id)) {
            return true;
        }

        return false;
    };

    return (
        <div className="mainOneNewsContainer">
            {deleteMode && (
                <div className="checkboxContainer">
                    <Checkbox onChange={handleChange} checked={defaultValueCheckBox()} />
                </div>
            )}

            <div className="headOneNewsContainer">
                <div className="nameText">{news.name}</div>
                <div>{createdDate}</div>
            </div>

            <div className="contentOneNewsContainer">{news.content}</div>
        </div>
    );
};

export default OneNews;
