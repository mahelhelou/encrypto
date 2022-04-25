/**
 * UX Improvements
 * 1. Show encrypted or decrypted string ONLY once
 */

// UI elements
const encryptionForm = document.querySelector('.encryption-form')
const encryptionInput = document.querySelector('.encryption-input')
const encryptionBtn = document.querySelector('.encryption-button')
const encryptionOutput = document.querySelector('.encryption-output')

/**
 * Functions
 * 1. Encrypt the string
 * 2. Decrypt the string
 */
function cipher(salt) {
	function textToChars(text) {
		return text.split('').map(c => c.charCodeAt(0))
	}

	function byteHex(n) {
		return ('0' + Number(n).toString(16)).substr(-2)
	}

	function applySaltToChar(code) {
		return textToChars(salt).reduce((a, b) => a ^ b, code)
	}

	return text => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
}

function decipher(salt) {
	function textToChars(text) {
		return text.split('').map(c => c.charCodeAt(0))
	}

	function applySaltToChar(code) {
		return textToChars(salt).reduce((a, b) => a ^ b, code)
	}
	return function (encoded) {
		return encoded
			.match(/.{1,2}/g)
			.map(hex => parseInt(hex, 16))
			.map(applySaltToChar)
			.map(charCode => String.fromCharCode(charCode))
			.join('')
	}
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
	let encryptedText

	encryptionSelect.addEventListener('change', () => {
		encryptionOption = encryptionSelect.options[encryptionSelect.selectedIndex].value
	})

	if (encryptionInput.value && encryptionOption === 'encrypt') {
		const myCipher = cipher('mySecretSalt')
		encryptedText = myCipher(encryptionInput.value)
	} else {
		const myDecipher = decipher('mySecretSalt')
		encryptedText = myDecipher(encryptionInput.value)
	}

	// Update the output string after submit (Once)
	encryptionOutput.innerHTML = `<p><span>Output</span>: ${encryptedText}</p>`
})
