const inputs = document.querySelectorAll('input')
const textareas = document.querySelectorAll('textarea')

inputs.forEach(input => {
  const label = document.querySelector(`label[for="${input.id}"]`)
  if (input.value === '') label.classList.remove('focus')
})

const addFocusClass = (parents) => {
  parents.forEach(child => {
    const label = document.querySelector(`label[for="${child.id}"]`)
    child.addEventListener('focus', () => {
      label.classList.add('focus')
    })
    child.addEventListener('focusout', () => {
      if (child.value === '') label.classList.remove('focus')
    })
  })
}

addFocusClass(inputs)
addFocusClass(textareas)

const submitFormButton = document.querySelector('form .button')
let recaptchaVerified = false

submitFormButton.addEventListener('click', (e) => {
  e.preventDefault()
  handleErrors([...inputs, ...textareas, document.querySelector('.g-recaptcha')])
})

const handleErrors = (fields) => {
  let errors = 0
  fields.forEach(field => {
    const errorText = document.querySelector(`label[for="${field.id}"] + .error`) || document.querySelector('.g-recaptcha + .error')
    if (field.value === '') {
      errors += 1
      errorText.innerText = 'Veuillez renseigner ce champ'
    } else if (!recaptchaVerified && field.className === 'g-recaptcha') {
      errors += 1
      errorText.innerText = 'Veuillez certifier que vous n\'êtes pas un robot'
    } else {
      errorText.innerText = ''
    }
  })
  if (errors === 0) {
    sendMessage(
      document.querySelector('#lastname').value,
      document.querySelector('#firstname').value,
      document.querySelector('#email').value,
      document.querySelector('#message').value,
    )
  }
}

function recaptchaVerify() {
  recaptchaVerified = true
}

const sendMessage = (lastname, firstname, email, message) => {
  fetch('/send-message', {
    method: 'POST',
    body: JSON.stringify({
      lastname,
      firstname,
      email,
      message
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => window.location.href = data.redirect)
  .catch(err => console.log(err))
}