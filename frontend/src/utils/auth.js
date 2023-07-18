export const BASE_URL = 'https://api-snv-project-mesto.ru';

//http://localhost:3001
//https://api-snv-project-mesto.ru

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
		credentials: "include",
		headers: {
			'set-cookie': 'jwt=token; SameSite=None; Secure',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email }),
	})
		.then((resolve) => {
			return dataServerAnswer(resolve)
		})
}

export const validation = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		credentials: "include",
		headers: {
			'set-cookie': 'jwt=token; SameSite=None; Secure',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((resolve) => {
			return dataServerAnswer(resolve)
		})
}

