import React, { useEffect, useState } from 'react'
import CollectionListItem from "./CollectionListItem/CollectionListItem"
import unsplashApi, {getTopics} from '../../api/unsplashApi'
import {toJson} from 'unsplash-js'

import classes from './CollectionList.module.scss'

function CollectionList() {
    const [collections, setCollections] = useState([])
    useEffect(() => {
        getTopics(1, 10, 'latest').then(toJson).then(json => {
            console.log(json.data)
            setCollections([
                ...json.data
              ])
          })
    }, [])

    return (
        <div className={classes.CollectionList}>
            {collections.map((collection, index) => 
                <CollectionListItem key={index} id={collection.slug} title={collection.title}/>
            )}
        </div>
    )
}

export default CollectionList
