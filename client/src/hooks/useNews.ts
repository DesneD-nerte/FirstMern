import { useMemo } from "react";
import { News } from '../../types';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useNews = () => {
    const { news, filter } = useSelector(
        (state: RootState) => state.newsData
    );

    const stringArray = filter.query.split(/[;,— ]+/)

    const searchedPosts = useMemo(() => {
        return news.filter(post => {
            for (const element of stringArray) {
                if(post.content.toLowerCase().includes(element.toLowerCase()) || post.name.toLowerCase().includes(element.toLowerCase())) {
                    return true;
                }
            }
        }
            
        );
    }, [news, filter])

    return searchedPosts;
}