import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard"
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HackerNews = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0);
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handlePageChange = event => {
        console.log(event);
        setCurrentPage(event.selected);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setCurrentPage(0);
        setQuery(searchInput);
        setSearchInput("");

        if(!searchInput) {
            toast("Input is empty")
        } else {
            setQuery(searchInput)
            setSearchInput("")
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://hn.algolia.com/api/v1/search?", {
                    params: {page: currentPage, query},
                }
                );
                const { hits, nbPages } = data;
                setNewsArticles(hits);
                setPages(nbPages);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();
    }, [currentPage, query])

    return (
        <div className="container">
            <h1>Hacker News</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Click here to search"
                    value={searchInput}
                    onChange={event => setSearchInput(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <p className="category">Category: {query}</p>

            <div>
                {
                    isLoading ? <p>Loading...</p> : newsArticles.map((newsArticle) => (
                        < NewsCard newsArticle={newsArticle} key={newsArticle.objectID} />
                    ))
                }
            </div>

            <ReactPaginate 
                nextLabel=">>"
                previousLabel="<<"
                breakLabel="..."
                forcePage={currentPage}
                pageCount={pages}
                renderOnZeroPageCount={null}
                onPageChange={handlePageChange}
                className="paginate-page"
                activeClassName="active-page"
                previousClassName="previous-page"
                nextClassName="next-page"
            />

        </div>
    );

};

export default HackerNews;