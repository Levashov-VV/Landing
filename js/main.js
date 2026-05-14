;(function () {
	const revealObserver = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible')
					revealObserver.unobserve(entry.target)
				}
			})
		},
		{
			rootMargin: '0px 0px -60px 0px',
			threshold: 0.12,
		},
	)

	window.revealObserver = revealObserver

	document.querySelectorAll('.reveal').forEach(el => {
		revealObserver.observe(el)
	})

	document.querySelectorAll('*').forEach(el => {
		const rect = el.getBoundingClientRect()
		if (rect.right > window.innerWidth + 1) {
			console.log('overflow:', el, rect.right, window.innerWidth)
		}
	})
})()
