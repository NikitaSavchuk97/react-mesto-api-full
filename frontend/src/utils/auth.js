export const BASE_URL = 'https://api.snv.mesto.nomoredomains.club';

function dataServerAnswer(resolve) {
	if (resolve.ok) {
		return resolve.json()
	}
	return resolve
}

export const registration = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then((resolve) => {
			return dataServerAnswer(resolve)
		})
}

export const authorization = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then((resolve) => {
			return dataServerAnswer(resolve)
		})
}

export const validation = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	})
		.then((resolve) => {
			return dataServerAnswer(resolve)
		})
}