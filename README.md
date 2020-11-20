# Photo gallery

Photo gallery using photos from [unsplash API](https://unsplash.com/developers)

## Views

- Section list, contains few of the sections from unsplash, each displaying 10 latest photos.
- Section, displays list of minatures of every available photo of section with infinite scroll. User should be able to sort by latest / most popular. On hover photo should be displayed number of downloads, likes, and (if available) country.
- Photo, displayed in big picture, with additional info from api. User should be able to like / share the photo using facebook.

## Launching

To install every packages you need call `npm install`.
To start the server you need to make `.env` file with parameters from Unsplash API.

```env
API_ACCESS=your_access_key
API_SECRET=your_secret
HOST_URL=www.your_domain.com
```

After making this file and downloading packages you can start server with `npm start`.
