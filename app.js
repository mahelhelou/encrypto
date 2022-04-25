// UI elements
const encryptionForm = document.querySelector('.encryption-form')
const encryptionInput = document.querySelector('.encryption-input')
const encryptionBtn = document.querySelector('.encryption-button')
const encryptionOutput = document.querySelector('.encryption-output')

// Encrypt the string
const cipher = salt => {
	const textToChars = text => text.split('').map(c => c.charCodeAt(0))
	const byteHex = n => ('0' + Number(n).toString(16)).substr(-2)
	const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

	return text => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
}

// Decrypt the string
const decipher = salt => {
	const textToChars = text => text.split('').map(c => c.charCodeAt(0))
	const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)
	return encoded =>
		encoded
			.match(/.{1,2}/g)
			.map(hex => parseInt(hex, 16))
			.map(applySaltToChar)
			.map(charCode => String.fromCharCode(charCode))
			.join('')
}

/**
 * On submitting the form, do the following:
 * 1. READ the input string
 * 2. READ the select option value
 * 3. CONVERT the string into encrypted ot decrypted version
 * 4. PRINT the value (Converted string) below the input
 */
encryptionForm.addEventListener('submit', e => {
	e.preventDefault()

	const encryptionSelect = document.querySelector('.encryption-options')
	let encryptionOption = encryptionSelect.value

	encryptionSelect.addEventListener('change', () => {
		encryptionOption = encryptionSelect.options[encryptionSelect.selectedIndex].value
	})

	if (encryptionOption === 'encrypt') {
		// To create a cipher
		const myCipher = cipher('mySecretSalt')

		// Then cipher any text:
		const encryptedText = myCipher(encryptionInput.value)

		encryptionOutput.insertAdjacentHTML('beforeend', `<p>${encryptedText}</p>`)
	}

	if (encryptionOption === 'decrypt') {
		// To decipher, you need to create a decipher and use it:
		const myDecipher = decipher('mySecretSalt')

		// Decrypt any string
		const decryptedString = myDecipher(encryptionInput.value)

		console.log(decryptedString)

		encryptionOutput.insertAdjacentHTML('beforeend', `<p>${decryptedString}</p>`)
	}
})
