import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toJson } from 'unsplash-js';
import unsplash from '../../api/unsplashApi';

import classes from './Photo.module.scss'

function Photo() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        unsplash.photos.getPhoto(id).then(toJson).then(json => {
            setPhoto(json)
        })
    }, [])
    if (photo == null) {
        return <div className={classes.loader} />
    }
    return (
        <div className={classes.Photo}>
            <div className={classes.image}>
                <img src={photo.urls.full} alt="" />
            </div>
            <div className={classes.description}>
                stats
            </div>
        </div>
    )
}

export default Photo
