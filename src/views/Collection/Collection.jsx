import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getTopic, getTopicsPhotos } from '../../api/unsplashApi'
import { toJson } from 'unsplash-js'

import classes from './Collection.module.scss';
import CollectionPhoto from './CollectionPhoto/CollectionPhoto';

function Collection() {
    const { id } = useParams();
    const [firstColumn, setFirstColumn] = useState([]);
    const [secondColumn, setSecondColumn] = useState([]);
    const [thirdColumn, setThirdColumn] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)
    const [sortBy, setSortBy] = useState('latest')
    const [err, setError] = useState('')

    useEffect(() => {
        getTopic(id)
            .then(toJson).then(json => {
                setMaxPages(Math.ceil(parseInt(json.data.total_photos) / 21));
                loadNext('latest');
            }).catch(err => {
                console.error(err);
                setError('Cannot connect to the server. Try again later')
            });
    }, [])

    const loadNext = (sort) => {
        if (currentPage <= maxPages) {
            setLoading(true);
            getTopicsPhotos(id, currentPage, 21, sort || sortBy)
                .then(toJson)
                .then(({ data }) => {
                    setFirstColumn([...firstColumn, ...data.filter((_, index) => index % 3 === 0)])
                    setSecondColumn([...secondColumn, ...data.filter((_, index) => index % 3 === 1)])
                    setThirdColumn([...thirdColumn, ...data.filter((_, index) => index % 3 === 2)])
                    setCurrentPage(currentPage + 1)
                    setLoading(false);
                }).catch((err) => {
                    setError('Cannot connect to the server. Try again later')
                    console.error(err);
                });
        }
    }

    const resetData = (sortBy) => {
        setSortBy(sortBy)
        setFirstColumn([]);
        setSecondColumn([]);
        setThirdColumn([]);
        setCurrentPage(1);
        loadNext(sortBy);
    }

    const onSortChange = (event) => {
        resetData(event.target.value);
    }

    const onScroll = (event) => {
        const totalHeight = event.target.scrollingElement.scrollHeight - window.innerHeight;
        const currentHeight = event.target.scrollingElement.scrollTop;

        const percent = currentHeight / totalHeight;
        if (percent > .7 && !loading) {
            loadNext();
        }
    }

    window.onscroll = (event) => onScroll(event);

    return (
        <div onScroll={onScroll} className={classes.Collection}>
            <div className={classes.options}>
                Sort by
                <select onChange={onSortChange}>
                    <option defaultChecked value="latest">latest</option>
                    <option value="popular">popular</option>
                </select>
            </div>
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
            {loading ? <div className={classes.loader} ></div> : null}
            {err != '' ? <div className={classes.error} >{err}</div> : null}
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
