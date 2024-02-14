import React from "react";
import {format} from "date-fns";

const NewsCard = ({ newsArticle }) => {
    if(!newsArticle.title) return null;
    return (
        <div>
            <article className="news-card">
                <h3>{newsArticle.title}</h3>
                <p>By {newsArticle.author}</p>
                <ul>
                    <li><a href={newsArticle.url}>Read more</a></li>
                    <li>{format(new Date(newsArticle.created_at), "MMMM dd yyy")}</li>
                </ul>
            </article>
        </div>
    )

};

export default NewsCard;