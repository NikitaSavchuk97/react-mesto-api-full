class Api {
	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(this._dataServerAnswer)
	}

	setUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: about,
			})
		}).then(this._dataServerAnswer)
	}

	setAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: avatar,
			})
		}).then(this._dataServerAnswer)
	}

	getCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(this._dataServerAnswer)
	}

	setCard(name, link) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
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
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(this._dataServerAnswer)
	}

	likeCard(id ) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(this._dataServerAnswer)
	}

	dislikeCard(id ) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				'set-cookie': 'jwt=token; SameSite=None; Secure',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
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
	baseUrl: 'https://api-snv-project-mesto.ru',
})

//http://localhost:3001
//https://api-snv-project-mesto.ru

export default api;