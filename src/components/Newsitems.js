import React from 'react'

const Newsitems = (props) => {

    let { title, description, imageurl, newsurl, author, date , source } = props;

    return (
      <div>
        <div className="card">
          <img src={!imageurl ? "https://media.istockphoto.com/id/1337232523/photo/high-angle-view-of-a-lake-and-forest.jpg?s=2048x2048&w=is&k=20&c=HUkCp1sJPh7ymFrdJD3iTuSr_Aas-TEnphd5cdhs58M=" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "90%"}}>
              {source}
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unkown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default Newsitems
