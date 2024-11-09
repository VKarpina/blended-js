import axios from 'axios';

class UnsplashAPI {
	#BASE_URL = 'https://api.unsplash.com/search/photos';
	#API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
	#query = '';
	#params = new URLSearchParams({
		orientation: 'portrait',
		client_id: this.#API_KEY,
		per_page: 12,
	});

	async fetchPopularPhotos(page) {
		const url = `${this.#BASE_URL}?query=popular&page=${page}&${this.#params}`;

		try {
			const { data } = await axios(url);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
	async fetchPhotosByQuery(page) {
		const url = `${this.#BASE_URL}?query=${this.#query}&page=${page}&${this.#params}`;

		try {
			const { data } = await axios(url);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
	set query(newQuery) {
		this.#query = newQuery;
	}
}

export default UnsplashAPI;
