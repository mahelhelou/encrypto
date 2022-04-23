// UI elements
const encryptionForm = document.querySelector('.encryption-form')
const encryptionInput = document.querySelector('.encryption-input')
const encryptionOption = document.querySelector('.encryption-options').value
const encryptionBtn = document.querySelector('.encryption-button')
const encryptionOutput = document.querySelector('.encryption-output')

console.log(encryptionOption)

encryptionBtn.addEventListener('click', function (e) {
	e.preventDefault()

	alert('Hello!')
})
