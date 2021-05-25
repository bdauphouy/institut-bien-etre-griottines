const nav = document.querySelector('nav')
const burger = document.querySelector('.burger')
const menu = document.querySelector('ul')

burger.addEventListener('click', () => {
  burger.classList.toggle('active')
  menu.classList.toggle('active')
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.classList.add('active')
  } else {
    nav.classList.remove('active')
  }
})

Array.prototype.slice.call(menu.children).forEach(li => {
  li.addEventListener('click', () => {
    Array.prototype.slice.call(menu.children).forEach(li => {
      li.classList.remove('active')
    })
    li.classList.add('active')
    menu.classList.remove('active')
    burger.classList.remove('active')
  })
})
