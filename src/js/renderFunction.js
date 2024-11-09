export default function renderFunction(array, gallery) {
	let HTML = '';
	array.forEach(({ urls: { full, small }, alt_description }) => {
		HTML += `<li class="gallery__item"><a href="${full}"><img class="gallery-img" src="${small}" alt="${alt_description}"></a></li>`;
	});
	gallery.innerHTML = HTML;
}
