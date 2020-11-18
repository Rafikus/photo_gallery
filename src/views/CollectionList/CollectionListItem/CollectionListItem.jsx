import React, { useEffect, useState } from 'react'
import unsplashApi from '../../../api/unsplashApi'
import { toJson } from 'unsplash-js'

import classes from '../CollectionList.module.scss'
import { useHistory } from 'react-router-dom'

function CollectionListItem(props) {
    const { id, title } = props
    const [photos, setPhotos] = useState([])
    const history = useHistory();

    useEffect(() => {
        unsplashApi.collections.getCollectionPhotos(id, 1, 10, 'latest', {orientation: "landscape"})
            .then(toJson)
            .then(json => {
                console.log(json)
                setPhotos(json);
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
                    <img key={index} src={photo.urls.thumb} alt={photo.description}/>
                )}
            </div>
        </div>
    )
}

export default CollectionListItem
