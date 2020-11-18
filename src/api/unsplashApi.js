// ES Modules syntax
import Unsplash from 'unsplash-js';
import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${process.env.API_ACCESS}`
    }
});

const unsplash = new Unsplash({ 
    accessKey: process.env.API_ACCESS,  
});


export function getTopic(id) {
    return api.get(`/topics/${id}`);
}

export function getTopics(page, per_page, order_by, ids) {
    return api.get('/topics', {
        params: {
            page, per_page, order_by, ids
        }
    });
}

export function getTopicsPhotos(id, page, per_page, order_by, orientation, ids) {
    return api.get(`/topics/${id}/photos`, {
        params: {
            page, per_page, order_by, orientation, ids
        }
    });
}

export default unsplash