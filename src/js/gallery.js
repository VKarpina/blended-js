import UnsplashAPI from './UnsplashAPI';
import renderFunction from './renderFunction';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const api = new UnsplashAPI();
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

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
	renderFunction(data.results, gallery);
});

pagination.on('afterMove', event => {
	const currentPage = event.page;
	api.fetchPopularPhotos(currentPage).then(data => {
		renderFunction(data.results, gallery);
	});
});

form.addEventListener('submit', event => {
	event.preventDefault();
	const value = form.elements.query.value.trim();
	if (value === '') {
		return;
	}
	api.query = value;
	api.fetchPhotosByQuery(page).then(data => {
		renderFunction(data.results, gallery);
		pagination.reset(data.total);
	});
});
