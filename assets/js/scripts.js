document.addEventListener('DOMContentLoaded', function () {
	var navbar = document.querySelector('.navbar');

	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	});

	var clipboard = new ClipboardJS('.copy-button');

	clipboard.on('success', function (e) {
		e.trigger.innerHTML = '<i class="fas fa-check"></i>';
		setTimeout(function () {
			e.trigger.innerHTML = '<i class="fas fa-copy"></i>';
		}, 2000);
	});

	clipboard.on('error', function (e) {
		console.error('Copy failed', e);
	});
});
