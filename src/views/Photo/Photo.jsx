import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toJson } from 'unsplash-js';
import unsplash from '../../api/unsplashApi';

import classes from './Photo.module.scss'

function Photo() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [stats, setStats] = useState(null);
    useEffect(() => {
        unsplash.photos.getPhoto(id).then(toJson).then(json => {
            setPhoto(json)
        });
        unsplash.photos.getPhotoStats(id).then(toJson).then(json => {
            setStats(json)
        });
    }, [])
    if (photo == null || stats == null) {
        return <div className={classes.loader} />
    }
    return (
        <div className={classes.Photo}>
            <div className={classes.image}>
                <img src={photo.urls.full} alt="" />
            </div>
            <div className={classes.description}>
                <div>
                    <div>Likes: {stats.likes.total}</div>
                    <div>Description: {stats.downloads.total}</div>
                    <div>Views: {stats.views.total}</div>
                </div>
                <div>
                    <div>Camera: {photo.exif.make} {photo.exif.model}</div>
                    <div>Exposure Time: {photo.exif.exposure_time}</div>
                    <div>Aperture: {photo.exif.aperture}</div>
                    <div>Focal Length: {photo.exif.focal_length}</div>
                    <div>ISO: {photo.exif.iso}</div>
                </div>
                {
                    photo.location.city != null || photo.location.country != null ?
                    <div>
                        <div>Location: {photo.location.city} {photo.location.country} </div>
                    </div> : null
                }
                <div>
                    <div>Username: {photo.user.username}</div>
                    <div><a href={photo.user.portfolio_url}>Name: {photo.user.name}</a></div>
                    <div>Bio: {photo.user.bio != null ? photo.user.bio : "-"}</div>
                    <div>Location: {photo.user.location != null ? photo.user.location : "-"}</div>
                </div>
                Statistics:
                    Downloads:
                        total
                        graph for last 30 days
                    Likes:
                        total
                        graph for last 30 days
                    Views:
                        total
                        graph for last 30 days
                        
                <div>
                    Tags: {
                        photo.tags.map(tag => <tag>{tag.title}</tag>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Photo
