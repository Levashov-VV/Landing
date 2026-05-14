const track = document.querySelector('.members__track')

const prevBtnDesktop = document.querySelector('.members__btn--prev')
const nextBtnDesktop = document.querySelector('.members__btn--next')
const currentElDesktop = document.querySelector('.members__counter-current')

const prevBtnMobile = document.querySelector('.members__btn--prev-mobile')
const nextBtnMobile = document.querySelector('.members__btn--next-mobile')
const currentElMobile = document.querySelector(
	'.members__counter-current-mobile',
)
const totalElMobile = document.querySelector('.members__counter-total-mobile')

const members = [
	{ name: 'Хозе-Рауль Капабланка', title: 'Чемпион мира по шахматам' },
	{ name: 'Эммануил Ласкер', title: 'Чемпион мира по шахматам' },
	{ name: 'Александр Алехин', title: 'Чемпион мира по шахматам' },
	{ name: 'Арон Нимцович', title: 'Чемпион мира по шахматам' },
	{ name: 'Рихард Рети', title: 'Чемпион мира по шахматам' },
	{ name: 'Остап Бендер', title: 'Гроссмейстер' },
]

let visible = window.innerWidth <= 430 ? 1 : 3
let index = visible
let autoSlide

function createCard(member) {
	const card = document.createElement('div')
	card.className = 'members__card'
	card.innerHTML = `
        <div class="members__card-image">
            <img src="./assets/images/event-person.webp" alt="${member.name}" width="320" height="320" loading="lazy" />
        </div>
        <div class="members__card-body">
            <h3 class="members__card-name">${member.name}</h3>
            <p class="members__card-title">${member.title}</p>
            <button class="members__card-btn">Подробнее</button>
        </div>
    `
	return card
}

function getGap() {
	if (window.innerWidth <= 430) return 0
	if (window.innerWidth <= 1240) return 12
	return 18
}

function getSlideWidth() {
	const firstCard = track.querySelector('.members__card')
	if (!firstCard) return 0

	if (window.matchMedia('(max-width: 768px)').matches) {
		return firstCard.getBoundingClientRect().width
	}

	return firstCard.getBoundingClientRect().width + getGap()
}

function updateCounter() {
	let realIndex = index - visible

	if (realIndex < 0) realIndex = members.length + realIndex
	if (realIndex >= members.length) realIndex = realIndex - members.length

	const counterValue = realIndex + 1

	if (currentElDesktop) currentElDesktop.textContent = counterValue
	if (currentElMobile) currentElMobile.textContent = counterValue
	if (totalElMobile) totalElMobile.textContent = members.length
}

function slideTo(i, withTransition = true) {
	const slideWidth = getSlideWidth()
	track.style.transition = withTransition ? 'transform 0.5s ease' : 'none'
	track.style.transform = `translateX(-${i * slideWidth}px)`
	index = i
	updateCounter()
}

function nextSlide() {
	slideTo(index + 1)
}

function prevSlide() {
	slideTo(index - 1)
}

function buildSlider() {
	if (!track) return

	track.innerHTML = ''

	const headClones = members.slice(0, visible)
	const tailClones = members.slice(-visible)

	;[...tailClones, ...members, ...headClones].forEach(member => {
		track.appendChild(createCard(member))
	})

	index = visible
	slideTo(index, false)
	updateCounter()
}

if (track) {
	track.addEventListener('transitionend', () => {
		if (index >= members.length + visible) {
			slideTo(visible, false)
		}

		if (index < visible) {
			slideTo(members.length + visible - 1, false)
		}
	})
}

function startAutoSlide() {
	stopAutoSlide()

	autoSlide = setInterval(() => {
		nextSlide()
	}, 4000)
}

function stopAutoSlide() {
	clearInterval(autoSlide)
}

function bindButton(button, action) {
	if (!button) return

	button.addEventListener('click', () => {
		stopAutoSlide()
		action()
		startAutoSlide()
	})
}

bindButton(nextBtnDesktop, nextSlide)
bindButton(prevBtnDesktop, prevSlide)
bindButton(nextBtnMobile, nextSlide)
bindButton(prevBtnMobile, prevSlide)

window.addEventListener('resize', () => {
	const newVisible = window.innerWidth <= 430 ? 1 : 3

	if (newVisible !== visible) {
		visible = newVisible
		buildSlider()
		startAutoSlide()
	} else {
		slideTo(index, false)
	}
})

buildSlider()
startAutoSlide()
