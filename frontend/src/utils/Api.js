class Api {
	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	getUserInfo(token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		}).then(this._dataServerAnswer)
	}

	setUserInfo({ name, about }, token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: about,
			})
		}).then(this._dataServerAnswer)
	}

	getCards(token) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		}).then(this._dataServerAnswer)
	}

	setCard({ name, link, token }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				link: link,
			})
		}).then(this._dataServerAnswer)
	}

	deleteCard(id, token) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				authorization: `Bearer ${token}`,
			}
		}).then(this._dataServerAnswer)
	}

	likeCard(id, token) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				authorization: `Bearer ${token}`,
			},
		}).then(this._dataServerAnswer)
	}

	dislikeCard(id, token) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				authorization: `Bearer ${token}`,
			},
		}).then(this._dataServerAnswer)
	}

	setAvatar(avatar, token) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
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
	baseUrl: 'http://localhost:3000',
})

//https://api.snv.mesto.nomoredomains.club

export default api;