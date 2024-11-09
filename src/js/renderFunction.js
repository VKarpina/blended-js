export default function renderFunction(array, gallery) {
	let HTML = '';
	array.forEach(({ urls: { small }, alt_description }) => {
		HTML += `<li class="gallery__item"><img class="gallery-img" src="${small}" alt="${alt_description}"></li>`;
	});
	gallery.innerHTML = HTML;
}
