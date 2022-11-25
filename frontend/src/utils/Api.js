class Api {
	constructor({ baseUrl, token }) {
		this._baseUrl = baseUrl;
		this._token = token;
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
		}).then(this._dataServerAnswer)
	}

	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: about,
			})
		}).then(this._dataServerAnswer)
	}

	getCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
		}).then(this._dataServerAnswer)
	}

	setCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				link: link,
			})
		}).then(this._dataServerAnswer)
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
			},
		}).then(this._dataServerAnswer)
	}

	likeCard(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: 'PUT',
			headers: {
				authorization: this._token,
			},
		}).then(this._dataServerAnswer)
	}

	dislikeCard(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
			},
		}).then(this._dataServerAnswer)
	}

	setAvatar({ avatar }) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: avatar,
			})
		}).then(this._dataServerAnswer)
	}

	_dataServerAnswer(resolve) {
		if (resolve.ok) {
			return resolve.json()
		}
		return Promise.reject(resolve.status)
	}
}

const api = new Api({
	baseUrl: 'https://api.snv.mesto.nomoredomains.club',
	token: `Bearer ${localStorage.getItem('token')}`,
})

export default api;