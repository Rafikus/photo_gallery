import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import unsplashApi from '../../api/unsplashApi'
import { toJson } from 'unsplash-js'

import classes from './Collection.module.scss';

let maxPages = 1;

function Collection() {
    const { id } = useParams();
    const [firstColumn, setFirstColumn] = useState([]);
    const [secondColumn, setSecondColumn] = useState([]);
    const [thirdColumn, setThirdColumn] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        unsplashApi.collections.getCollection(id)
        .then(toJson).then(json => {
            setMaxPages(Math.ceil(parseInt(json.total_photos) / 21));
            loadNext();
            console.log(maxPages)
        });
    }, [])

    const loadNext = () => {
        if(currentPage <= maxPages){
            setLoading(true);
            unsplashApi.collections.getCollectionPhotos(id, currentPage, 21, 'latest')
                .then(toJson)
                .then(json => {
                    setFirstColumn([...firstColumn, ...json.filter((_, index) => index % 3 === 0)])
                    setSecondColumn([...secondColumn, ...json.filter((_, index) => index % 3 === 1)])
                    setThirdColumn([...thirdColumn, ...json.filter((_, index) => index % 3 === 2)])
                    setCurrentPage(currentPage + 1)
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }
    console.log({loading})

    const onScroll = (event) => {
        const totalHeight = event.target.scrollHeight - window.innerHeight;
        const currentHeight = event.target.scrollTop;

        const percent = currentHeight / totalHeight;
        if (percent > .9 && !loading) {
            loadNext();
        }
    }
    console.log({maxPages, currentPage})

    return (
        <div onScroll={onScroll} className={classes.Collection}>
            
            <div className={classes.column}>
                {firstColumn.map((photo, index) =>
                    <img key={index} src={photo.urls.regular} alt={photo.description} />
                )}
            </div>
            <div className={classes.column}>
                {secondColumn.map((photo, index) =>
                    <img key={index} src={photo.urls.regular} alt={photo.description} />
                )}
                
            </div>
            <div className={classes.column}>
                {thirdColumn.map((photo, index) =>
                    <img key={index} src={photo.urls.regular} alt={photo.description} />
                )}
            </div>
            {loading ? <div className={classes.spinner}/> : null}
            {currentPage > maxPages ? 
                <div className={classes.end}>
                    No more photos to show for this collection <br/>
                    <Link to="/">See other collections</Link>
                </div> 
                : null}
        </div>
    )
}

export default Collection
