import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import unsplashApi, { getTopic, getTopicsPhotos } from '../../api/unsplashApi'
import { toJson } from 'unsplash-js'

import classes from './Collection.module.scss';
import CollectionPhoto from './CollectionPhoto/CollectionPhoto';

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
        getTopic(id)
            .then(toJson).then(json => {
                setMaxPages(Math.ceil(parseInt(json.data.total_photos) / 21));
                loadNext();
            });
    }, [])

    const loadNext = () => {
        if (currentPage <= maxPages) {
            setLoading(true);
            getTopicsPhotos(id, currentPage, 21, 'popular')
                .then(toJson)
                .then(({ data }) => {
                    setFirstColumn([...firstColumn, ...data.filter((_, index) => index % 3 === 0)])
                    setSecondColumn([...secondColumn, ...data.filter((_, index) => index % 3 === 1)])
                    setThirdColumn([...thirdColumn, ...data.filter((_, index) => index % 3 === 2)])
                    setCurrentPage(currentPage + 1)
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }
    console.log({ loading })

    const onScroll = (event) => {
        const totalHeight = event.target.scrollHeight - window.innerHeight;
        const currentHeight = event.target.scrollTop;

        const percent = currentHeight / totalHeight;
        if (percent > .9 && !loading) {
            loadNext();
        }
    }

    return (
        <div onScroll={onScroll} className={classes.Collection}>
            <div className={classes.column}>
                {firstColumn.map((photo, index) =>
                    <CollectionPhoto
                        key={index}
                        photo={photo}
                    />
                )}
            </div>
            <div className={classes.column}>
                {secondColumn.map((photo, index) =>
                    <CollectionPhoto
                        key={index}
                        photo={photo}
                    />
                )}

            </div>
            <div className={classes.column}>
                {thirdColumn.map((photo, index) =>
                    <CollectionPhoto
                        key={index}
                        photo={photo}
                    />
                )}
            </div>
            {loading ? <div className={classes.loader} /> : null}
            {currentPage > maxPages ?
                <div className={classes.end}>
                    No more photos to show for this collection <br />
                    <Link to="/">See other collections</Link>
                </div>
                : null}
        </div>
    )
}

export default Collection
