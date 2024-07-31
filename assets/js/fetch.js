document.addEventListener('DOMContentLoaded', function () {
	fetch('0.1.0/data/categories.json')
		.then(response => response.json())
		.then(data => {
			const categoryList = document.getElementById('categoryList');
			let ul = document.createElement('ul');
			ul.classList.add('nav', 'nav-pills', 'nav-sidebar', 'flex-column');

			data.forEach(item => {
				let li = document.createElement('li');

				if (item.type === 'nav-header') {
					li.classList.add('nav-header');
					li.textContent = item.display;
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
	const contentArea = document.getElementById('docContent');
	const filePath = `0.1.0/docs/${content}.html`;

	fetch(filePath)
		.then(response => {
			if (response.ok) {
				return response.text();
			} else {
				throw new Error('File not found');
			}
		})
		.then(text => {
			contentArea.innerHTML = text;
		})
		.catch(error => {
			console.error('Error loading content:', error);
			contentArea.innerHTML = `<p>Error loading content: ${error.message}</p>`;
		});
}