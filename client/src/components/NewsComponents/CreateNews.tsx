import { Button } from "@mui/material";
import React, { useState } from "react";
import "../../styles/CreateNews.css";
import { News } from "../../../types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { AddNews } from "../../store/news/newsData/newsDataThunks";

function CreateNews({ setVisible }) {
    const { limit } = useSelector((state: RootState) => state.newsData);

    const dispatch = useDispatch<AppDispatch>();

    const [oneNews, setOneNews] = useState<News>({
        name: "",
        content: "",
        createdAt: new Date(),
    });

    const addNewNews = () => {
        setOneNews({ ...oneNews, createdAt: new Date() });

        dispatch(AddNews(oneNews, limit));
        setVisible(false);
    };

    const declineHandle = () => {
        setVisible(false);
    };

    return (
        <form>
            <div className="mainComponent">
                <div className="contentContainer">
                    <div className="nameNews">
                        <p id="p">Название новости:</p>
                        <textarea
                            className="inputName"
                            value={oneNews.name}
                            onChange={(e) =>
                                setOneNews({ ...oneNews, name: e.target.value })
                            }
                            maxLength={135}
                        ></textarea>
                    </div>
                    <div className="contentNews">
                        <p id="p">Содержание:</p>
                        <textarea
                            className="inputContent"
                            value={oneNews.content}
                            onChange={(e) =>
                                setOneNews({ ...oneNews, content: e.target.value })
                            }
                        ></textarea>
                    </div>

                    <div className="buttonsContainer">
                        <Button id="button" variant="outlined" onClick={addNewNews}>
                            Готово
                        </Button>
                        <Button id="button" variant="outlined" onClick={declineHandle}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CreateNews;
