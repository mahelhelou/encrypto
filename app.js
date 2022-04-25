// UI elements
const encryptionInput = document.querySelector('.encryption-input')
const decryptionInput = document.querySelector('.decryption-input')

function updateEncryptionInput(e) {
	let encryptionInputValue = e.target.value
	console.log(encryptionInputValue)
}

loadEventListeners()

function loadEventListeners() {
	encryptionInput.addEventListener('change', updateEncryptionInput)
	// decryptionInput.addEventListener('change', updateDecryptionInput)
}
