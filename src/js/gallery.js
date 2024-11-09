import UnsplashAPI from './UnsplashAPI';
import renderFuntion from './renderFunction';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const api = new UnsplashAPI();
const gallery = document.querySelector('.gallery');

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
	totalItems: 0,
	itemsPerPage: 12,
	visiblePages: 5,
	page: 1,
});

const page = pagination.getCurrentPage();

api.fetchPopularPhotos(page).then(data => {
	console.log(data);
	pagination.reset(data.total);
	renderFuntion(data.results, gallery);
});
