import UnsplashAPI from './UnsplashAPI';

const api = new UnsplashAPI();

api.fetchPopularPhotos(1).then(data => {
	console.log(data);
});
