document.addEventListener('DOMContentLoaded', function () {
	const spinner = document.getElementById('spinner');
	const contentArea = document.getElementById('docContent');
	const categoryList = document.getElementById('categoryList');

	let categoryLinks = []; // Array to store category links

	function showSpinner() {
		spinner.style.display = 'block';
	}

	function hideSpinner() {
		spinner.style.display = 'none';
	}

	function loadContent(content, version) {
		const filePath = `docs/${version}/contents/${content}.html`;

		showSpinner();

		fetch(filePath)
			.then(response => {
				if (response.ok) {
					return response.text();
				} else {
					throw new Error('File not found');
				}
			})
			.then(text => {
				contentArea.innerHTML = `
				<link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" rel="stylesheet" />
				<div class="space"></div>
				${text}
				<div class="space"></div>
				<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
				<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
				`;
				contentArea.style.display = 'block';
				updateURL(content, version);
				setActiveCategory(content); // Set active category after content is loaded
			})
			.catch(error => {
				contentArea.innerHTML = `<section style="height:100vh" class="d-flex justify-content-center align-items-center text-muted">
				<h1>Data null</h1>
				</section>`;
			})
			.finally(() => {
				hideSpinner(); // Ẩn spinner khi kết thúc tải
			});
	}

	function updateURL(content, version) {
		const url = new URL(window.location);
		url.searchParams.set('content', content);
		url.searchParams.set('version', version); // Thêm phiên bản vào URL
		history.pushState(null, '', url);
	}

	function setActiveCategory(content) {
		categoryLinks.forEach(link => {
			if (link.getAttribute('data-content') === content) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	// Lấy phiên bản từ URL
	const urlParams = new URLSearchParams(window.location.search);
	const content = urlParams.get('content');
	const version = urlParams.get('version') || '0.1.0';

	// Build the category list first
	fetch(`docs/${version}/data/categories.json`)
		.then(response => response.json())
		.then(data => {
			let ul = document.createElement('ul');
			ul.classList.add('nav', 'nav-pills', 'nav-sidebar', 'flex-column');

			data.forEach(item => {
				let li = document.createElement('li');

				if (item.type === 'nav-header') {
					li.classList.add('nav-header');
					li.textContent = item.display;
				}

				if (item.subcategories && item.subcategories.length > 0) {
					let subUl = document.createElement('ul');
					subUl.classList.add('nav', 'nav-pills', 'nav-sidebar', 'flex-column');

					item.subcategories.forEach(subcategory => {
						let subLi = document.createElement('li');
						subLi.classList.add('nav-item');

						let link = document.createElement('a');
						link.href = `#${subcategory.slug}`;
						link.classList.add('nav-link');
						link.textContent = subcategory.display;
						link.setAttribute('data-content', subcategory.content); // Set data-content attribute

						// Add the link to categoryLinks array
						categoryLinks.push(link);

						link.addEventListener('click', function (event) {
							event.preventDefault();
							loadContent(subcategory.content, version);
						});
						subLi.appendChild(link);
						subUl.appendChild(subLi);
					});
					li.appendChild(subUl);
				}
				ul.appendChild(li);
			});
			categoryList.appendChild(ul);

			// Load content if there's no content specified in the URL
			if (!content && data.length > 0 && data[0].subcategories.length > 0) {
				loadContent(data[0].subcategories[0].content, version);
			} else if (content) {
				loadContent(content, version); // Load content based on URL parameter
			}
		})
		.catch(error => console.error('Error loading categories:', error));
});
