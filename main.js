const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector('#our-temp').textContent = ourTemperature
}
start()

async function getPets() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petData = await petsPromise.json()

  petData.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector('.pet-card').dataset.species = pet.species
    clone.querySelector('h4').textContent = pet.name
    clone.querySelector('.description').textContent = pet.description
    clone.querySelector('.age').textContent = petAge(pet.birthYear)

    if (!pet.photo) pet.photo = "img/fallback.jpg"

    clone.querySelector('.pet-card-img img').src = pet.photo
    clone.querySelector('.pet-card-img img').alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone)
  })
  document.querySelector('.pet-cards').appendChild(wrapper)
}
getPets()

function petAge(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if ( age === 1) return "1 year old"
  if (age === 0) return "Less than 1 year"
  return `${age} years old`
}

const allButtons = document.querySelectorAll('.filters button')

allButtons.forEach(el => {
  el.addEventListener('click', handleButtonClick)
})
function handleButtonClick(e) {
  allButtons.forEach(el => el.classList.remove('active'))

  e.target.classList.add('active')

  const currentFilter = e.target.dataset.filter

  document.querySelectorAll('.pet-card').forEach(el => {
    if (currentFilter === el.dataset.species || currentFilter === "all") {
      el.style.display = "grid"
    } else {
      el.style.display = "none"
    }
  })
}