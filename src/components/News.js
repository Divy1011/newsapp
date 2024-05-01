
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      const { articles, totalResults } = response.data;
      setArticles(articles);
      setTotalResults(totalResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pagesize}`;
    try {
      const response = await axios.get(url);
      const { articles, totalResults } = response.data;
      setArticles([...articles, ...articles]);
      setTotalResults(totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey -- Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pagesize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
