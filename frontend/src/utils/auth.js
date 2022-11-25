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

export const authorization = (data) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
		.then((resolve) => {
			if (resolve.status === 200) {
				console.log(JSON.stringify(data))
				return resolve.json();
			}
			if (resolve.status === 400) {
				throw new Error('Не передано одно из полей');
			}
			if (resolve.status === 401) {
				throw new Error('Пользователь с email не найден');
			}
			return dataServerAnswer(resolve)
		})
		.then((data) => {
			if (data) {
				localStorage.setItem('jwt', data.token);
			}
			return data
		})
}

export const validation = (token) => {
	console.log(token)
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	})
		.then((res) => {
			if (res.status === 200) {
				console.log('возвращает!')
				return res.json();
			}
			if (res.status === 400) {
				throw new Error('Токен не передан или передан не в том формате');
			}
			if (res.status === 401) {
				throw new Error('Переданный токен некорректен');
			}
		})
		.then((data) => {
			return data;
		})
	/*
	.then((resolve) => {
		return dataServerAnswer(resolve)
	})
	*/
}