import React, { useEffect, useState } from 'react'
import unsplashApi, { getTopicsPhotos } from '../../../api/unsplashApi'
import { toJson } from 'unsplash-js'

import classes from '../CollectionList.module.scss'
import { useHistory } from 'react-router-dom'

function CollectionListItem(props) {
    const { id, title } = props
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory();

    useEffect(() => {
        getTopicsPhotos(id, 1, 10, 'latest', 'landscape')
            .then(toJson)
            .then(json => {
                setPhotos(json.data);
                setLoading(false)
            });
    }, [])

    const goToCollection = () => {
        history.push(`/collection/${id}`);
    }

    return (
        <div className={classes.item} onClick={goToCollection}>
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.photos}>
                {photos.map((photo, index) =>
                    <img key={index} src={photo.urls.thumb} alt={photo.description} />
                )}
                {loading ? <div className={classes.loader} /> : null}
            </div>
        </div>
    )
}

export default CollectionListItem
