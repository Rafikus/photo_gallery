import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toJson } from 'unsplash-js';
import unsplash from '../../api/unsplashApi';
import { Chart } from "react-google-charts";
import classes from './Photo.module.scss'

function Photo() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [stats, setStats] = useState(null);

    const chartOptions = {
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        backgroundColor: "#565656",
        height: 100,


    }

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
                <div className={classes.descriptionBubble}>
                    <div>
                        <Chart
                            height={'80px'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            options={{legend: 'none', title: `Total likes: ${stats.likes.total}`, backgroundColor: '#666', colors: ['#fff']}}
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
                            options={{legend: 'none', title: `Total downloads: ${stats.downloads.total}`, backgroundColor: '#666', colors: ['#fff']}}
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
                            options={{legend: 'none', title: `Total views: ${stats.views.total}`, backgroundColor: '#666', colors: ['#fff']}}
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
        </div>
    )
}

export default Photo
