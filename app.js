// UI elements
const encryptionInput = document.querySelector('.encryption-input')
const decryptionInput = document.querySelector('.decryption-input')

loadEventListeners()

function loadEventListeners() {
	encryptionInput.addEventListener('input', updateEncryptionInput)
	decryptionInput.addEventListener('input', updateDecryptionInput)
}

function updateEncryptionInput(e) {
	const encryptionOutput = document.querySelector('.encryption-output')
	let encryptionInputValue = e.target.value

	const cipher = salt => {
		const textToChars = text => text.split('').map(c => c.charCodeAt(0))
		const byteHex = n => ('0' + Number(n).toString(16)).substr(-2)
		const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

		return text => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
	}

	const myCipher = cipher('mySecretSalt')
	const encryptedText = myCipher(encryptionInputValue)

	if (encryptedText.length > 0) {
		encryptionOutput.innerHTML = `<p><span>Output: </span>${encryptedText}</p>`
	} else {
		encryptionOutput.innerHTML = ''
	}
}

function updateDecryptionInput(e) {
	const decryptionOutput = document.querySelector('.decryption-output')
	let encryptionInputValue = e.target.value

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

	const myDecipher = decipher('mySecretSalt')
	const decryptedText = myDecipher(encryptionInputValue)

	if (decryptedText.length > 0) {
		decryptionOutput.innerHTML = `<p><span>Output: </span>${decryptedText}</p>`
	} else {
		decryptionOutput.innerHTML = ''
	}
}
