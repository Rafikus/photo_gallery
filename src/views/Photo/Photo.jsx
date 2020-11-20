import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { toJson } from 'unsplash-js';
import unsplash from '../../api/unsplashApi';
import { Chart } from "react-google-charts";
import classes from './Photo.module.scss'

function Photo() {
    const history = useHistory();
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [stats, setStats] = useState(null);
    const [photoRatio, setPhotoRatio] = useState(-1);
    const [ref, setRef] = useState(null);
    const [orientationStyle, setOrientationStyle] = useState(classes.width);

    const photoUrl = `http://${process.env.HOST_URL}${history.location.pathname}`;


    useEffect(() => {
        unsplash.photos.getPhoto(id).then(toJson).then(json => {
            setPhoto(json)
        });
        unsplash.photos.getPhotoStats(id).then(toJson).then(json => {
            setStats(json)
        });
        console.log(photo)
    }, [])

    const observer = new ResizeObserver(_ => { getImageClass() })

    const getImageClass = (() => {
        if (photo >= 0) setPhotoRatio(photo.height / photo.width)
        if (window.innerHeight / window.innerWidth > (photoRatio >= 0 ? photoRatio : photo.height / photo.width)) {
            setOrientationStyle(classes.width)
        } else {
            setOrientationStyle(classes.height)
        }
    }).bind(this)

    ref && observer.observe(ref);

    if (photo == null || stats == null) {
        return <div className={classes.loader} />
    }

    return (
        <div ref={setRef} className={classes.Photo}>
            <div className={classes.image}>
                <img className={orientationStyle} src={photo.urls.full} alt="" />
            </div>
            <div className={classes.description}>
                <div className={classes.descriptionBubble}>
                    <div>
                        <Chart
                            height={'80px'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            options={{ legend: 'none', title: `Total likes: ${stats.likes.total}`, backgroundColor: '#666', colors: ['#fff'] }}
                            data={[
                                ["day", "likes"],
                                ...stats.likes.historical.values.map(({ date, value }) => ([date, value]))
                            ]} />
                    </div>
                    <div>
                        <Chart
                            height={'80px'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            options={{ legend: 'none', title: `Total downloads: ${stats.downloads.total}`, backgroundColor: '#666', colors: ['#fff'] }}
                            data={[
                                ["day", "downloads"],
                                ...stats.downloads.historical.values.map(({ date, value }) => ([date, value]))
                            ]} />

                    </div>
                    <div>
                        <Chart
                            height={'80px'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            options={{ legend: 'none', title: `Total views: ${stats.views.total}`, backgroundColor: '#666', colors: ['#fff'] }}
                            data={[
                                ["day", "views"],
                                ...stats.views.historical.values.map(({ date, value }) => ([date, value]))
                            ]} />

                    </div>
                </div>
                <div className={classes.descriptionBubble}>
                    <div>Camera: {photo.exif.make} {photo.exif.model}</div>
                    <div>Exposure Time: {photo.exif.exposure_time}</div>
                    <div>Aperture: {photo.exif.aperture}</div>
                    <div>Focal Length: {photo.exif.focal_length}</div>
                    <div>ISO: {photo.exif.iso}</div>
                </div>
                <div className={classes.descriptionBubble}>
                    <div>Username: {photo.user.username}</div>
                    <div><a href={photo.user.portfolio_url}>Name: {photo.user.name}</a></div>
                    <div>Bio: {photo.user.bio != null ? photo.user.bio : "-"}</div>
                    <div>Location: {photo.user.location != null ? photo.user.location : "-"}</div>
                </div>
                <div className={classes.descriptionBubble}>
                    Tags: {
                        photo.tags.map((tag, index) => <div key={index}>{tag.title}</div>)
                    }
                </div>
            </div>
            <div className={classes.fbStuff}>
                <div className="fb-like" data-href={photoUrl} data-width="" data-layout="button" data-action="like" data-size="large" data-share="false"></div>
                <div className="fb-share-button" href={photoUrl} data-layout="button" data-size="large"><a target="_blank" href={photoUrl} className="fb-xfbml-parse-ignore">Share</a></div>
            </div>
        </div>
    )
}

export default Photo
