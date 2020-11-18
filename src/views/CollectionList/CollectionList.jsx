import React, { useEffect, useState } from 'react'
import CollectionListItem from "./CollectionListItem/CollectionListItem"
import unsplashApi from '../../api/unsplashApi'
import {toJson} from 'unsplash-js'

import classes from './CollectionList.module.scss'

function CollectionList() {
    const [collections, setCollections] = useState([])
    useEffect(() => {
        unsplashApi.collections.listCollections(2, 7, "oldest")
        .then(toJson)
        .then(json => {
          setCollections([
              ...json
            ])
        });
    }, [])

    return (
        <div className={classes.CollectionList}>
            {collections.map((collection, index) => 
                <CollectionListItem key={index} id={collection.id} title={collection.title}/>
            )}
        </div>
    )
}

export default CollectionList
