import React, {useState} from 'react'
import { useEffect } from 'react';
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {

  const [articles,setarticles] =useState([])
  const [loading,setloading] =useState(true)
  const [page,setpage] =useState(1)
  const [totalResults,settotalResults] =useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    
  

  const updateNews = async() => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b859c45f047443428b7fb3d990def2ef&page=${page}&pageSize=${props.pageSize}`
    setloading(true);
    let data = await fetch(url);
    let parseddata = await data.json()
    props.setProgress(50);
    console.log(parseddata);
    setarticles(parseddata.articles);
    settotalResults(parseddata.totalResults);
    setloading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
  },[]);

  // const handleNextclick = async () => {
  //   // if (this.state.page + 1 >= this.state.totalResults) {
  //   //   // Don't fetch more data if there are no more pages.
  //   //   return;
  //   // }

  //   // // Increment the page number and fetch the next page of data.
  //   // const nextPage = this.state.page + 1;
  //   // console.log(nextPage);

  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b2ab3deb0604411a23eb94db15f5c70&page=${nextPage}&pageSize=${props.pageSize}`;

  //   // try {
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parseddata = await data.json();
  //   //   this.setState({loading: false});

  //   //   this.setState({
  //   //     page: nextPage,
  //   //     articles: parseddata.articles,
  //   //   });
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   // }
  //   setpage(page+1);
  //   updateNews();
  // };


  // const handlePrevclick = async () => {
  //   //   console.log("previous")
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b2ab3deb0604411a23eb94db15f5c70&page=${this.state.page - 1}&pageSize=${props.pageSize}`
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parseddata = await data.json();
  //   //   console.log(parseddata);
  //   //   this.setState({
  //   //   page:this.state.page - 1,
  //   //   articles: parseddata.articles,
  //   //   loading: false
  //   // })
  //   setpage(page-1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b859c45f047443428b7fb3d990def2ef&page=${page+1}&pageSize=${props.pageSize}`
    setpage(page+1);
    let data = await fetch(url);
    let parseddata = await data.json()
    console.log(parseddata);
    setarticles(articles.concat(parseddata.articles));
    settotalResults( parseddata.totalResults)
    setloading(false);
  };

    return (
      <>
        <h1 className="text-center"style={{marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} headlines </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >

          <div className="container">
            <div className="row my-4">
              {articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <Newsitems title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevclick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}

      </>
    )
  }
  News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

  News.PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

export default News
