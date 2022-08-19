import React from "react";
import OneNews from "./OneNews";
import "../../styles/NewsList.css";
import { News } from "../../../types";

type newsArrayProps = {
    news: Array<News>;
};

const NewsList = (props: newsArrayProps) => {
    const { news } = props;

    return (
        <div className="newsListComponent">
            <>
                {news.length ? (
                    <div>
                        {news.map((oneNews, index) => (
                            <div key={oneNews._id as React.Key}>
                                <OneNews news={oneNews} />
                                <div className="separator"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h1>Новости отсутствуют</h1>
                    </div>
                )}
            </>
        </div>
    );
};

export default NewsList;
