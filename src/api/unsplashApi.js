// ES Modules syntax
import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({ 
    accessKey: process.env.API_ACCESS,  
});


export default unsplash