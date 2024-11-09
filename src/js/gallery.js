import UnsplashAPI from './UnsplashAPI';
import renderFunction from './renderFunction';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const api = new UnsplashAPI();
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

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

pagination.on('afterMove', getPopular);

form.addEventListener('submit', event => {
	event.preventDefault();
	const value = form.elements.query.value.trim();
	if (value === '') {
		return;
	}
	pagination.off('afterMove', getPopular);
	pagination.off('afterMove', getByQuery);
	gallery.innerHTML = '';
	api.query = value;
	showElement(loader);
	api
		.fetchPhotosByQuery(page)
		.then(data => {
			if (data.results.length === 0) {
				iziToast.info({ message: 'Photos not found, try another query' });
				hideElement(container);
				return;
			}
			renderFunction(data.results, gallery);
			pagination.reset(data.total);
			if (data.total <= 12) {
				hideElement(container);
			} else {
				showElement(container);
			}
			iziToast.success({ message: `We found ${data.total} photos` });
		})
		.catch(error => {
			console.log(error);
			iziToast.error({ message: 'Something went wrong' });
		})
		.finally(() => {
			hideElement(loader);
			form.reset();
		});

	pagination.on('afterMove', getByQuery);
});

function getPopular(event) {
	const currentPage = event.page;
	api.fetchPopularPhotos(currentPage).then(data => {
		renderFunction(data.results, gallery);
	});
}

function getByQuery(event) {
	const currentPage = event.page;
	api.fetchPhotosByQuery(currentPage).then(data => {
		renderFunction(data.results, gallery);
	});
}

function showElement(element) {
	element.classList.remove('hidden');
}

function hideElement(element) {
	element.classList.add('hidden');
}
