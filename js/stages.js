const stagesSlider = document.querySelector('.stages__slider')
const stagesTrack = document.querySelector('.stages__track')
const stagesSlides = document.querySelectorAll('.stages__slide')
const stagesPrevBtn = document.querySelector('.stages__btn--prev')
const stagesNextBtn = document.querySelector('.stages__btn--next')
const stagesDots = document.querySelectorAll('.stages__dot')

if (stagesSlider && stagesTrack && stagesSlides.length) {
	let currentStage = 0
	const lastStage = stagesSlides.length - 1

	function updateStagesSlider() {
		stagesTrack.style.transform = `translateX(-${currentStage * 100}%)`

		stagesDots.forEach((dot, index) => {
			dot.classList.toggle('is-active', index === currentStage)
		})

		stagesPrevBtn.disabled = currentStage === 0
		stagesNextBtn.disabled = currentStage === lastStage
	}

	stagesPrevBtn.addEventListener('click', () => {
		if (currentStage > 0) {
			currentStage -= 1
			updateStagesSlider()
		}
	})

	stagesNextBtn.addEventListener('click', () => {
		if (currentStage < lastStage) {
			currentStage += 1
			updateStagesSlider()
		}
	})

	stagesDots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			currentStage = index
			updateStagesSlider()
		})
	})

	updateStagesSlider()
}
