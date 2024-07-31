document.addEventListener('DOMContentLoaded', function () {
	fetch('docs/0.1.0/data/categories.json')
		.then(response => response.json())
		.then(data => {
			const categoryList = document.getElementById('categoryList');
			let ul = document.createElement('ul');
			ul.classList.add('nav', 'nav-pills', 'nav-sidebar', 'flex-column');

			data.forEach(item => {
				let li = document.createElement('li');

				if (item.type === 'nav-header') {
					li.classList.add('nav-header', 'mt-2');
					li.textContent = item.display.toUpperCase();
				} else if (item.type === 'nav-item') {
					li.classList.add('nav-item');
					li.innerHTML = `
                        <a href="#docContent" class="nav-link" data-content="${item.content}">
                            <p>${item.display}</p>
                        </a>
                    `;
				}

				if (item.subcategories && item.subcategories.length > 0) {
					let subUl = document.createElement('ul');
					subUl.classList.add('nav', 'nav-pills', 'nav-sidebar', 'flex-column');

					item.subcategories.forEach(subcategory => {
						let subLi = document.createElement('li');
						subLi.classList.add('nav-item');

						subLi.innerHTML = `
                            <a href="#docContent" class="nav-link" data-content="${subcategory.content}">
                                <p>${subcategory.display}</p>
                            </a>
                        `;
						subUl.appendChild(subLi);
					});

					li.appendChild(subUl);
				}

				ul.appendChild(li);
			});

			categoryList.appendChild(ul);

			document.querySelectorAll('#categoryList .nav-link').forEach(link => {
				link.addEventListener('click', function (event) {
					event.preventDefault();
					const content = this.getAttribute('data-content');
					loadContent(content);
				});
			});
		})
		.catch(error => console.error('Error loading categories:', error));
});

function loadContent(content) {
	const filePath = `docs/0.1.0/contents/${content}.html`;
	const contentArea = document.getElementById('myIframe');
	contentArea.setAttribute('src', filePath)
}