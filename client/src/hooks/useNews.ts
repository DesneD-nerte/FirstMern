import { useMemo } from "react";
import { News } from '../types';

export const useNews = (posts: Array<News>, query: string) => {

    const stringArray = query.split(/[;,— ]+/)

    const searchedPosts = useMemo(() => {
        return posts.filter(post => {
            for (const element of stringArray) {
                if(post.content.toLowerCase().includes(element.toLowerCase()) || post.name.toLowerCase().includes(element.toLowerCase())) {
                    return true;
                }
            }
        }
            
        );
    }, [posts, query])

    return searchedPosts;
}