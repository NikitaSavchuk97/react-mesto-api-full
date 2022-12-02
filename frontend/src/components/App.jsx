import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Main from "./Main";
import Login from './Login';
import Header from "./Header";
import Footer from "./Footer";
import api from "../utils/Api";
import Register from './Register';
import ImagePopup from "./ImagePopup";
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import PopupTypeInfo from "./PopupTypeInfo";
import ProtectedRoute from './ProtectedRoute';
import PopupTypeAvatar from "./PopupTypeAvatar";
import PopupTypeAddCard from "./PopupTypeAddCard";
import PopupTypeConfirm from "./PopupTypeConfirm";

function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
	const [successOrErrorMessage, setSuccessOrErrorMessage] = useState('');
	const [successRegistration, setSuccessRegistration] = useState(false);
	const [isEditInfoPopupOpen, setIsEditInfoPopupOpen] = useState(false);
	const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [successOrError, setSuccessOrError] = useState();
	const [currentUser, setCurrentUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [cards, setCards] = useState([]);
	const [token, setToken] = useState("");
	const navigate = useNavigate();

	/*
	useEffect(() => {
		if (loggedIn) {
			api.getUserInfo(token)
				.then((res) => {
					setUserEmail(res.email)
					setCurrentUser(res)
				})
				.catch((err) => {
					console.log(`Устал искать что не так! Ошибка ${err}`);
				});
		}
	}, [loggedIn, token]);

	useEffect(() => {
		if (loggedIn) {
			api.getCards(token)
				.then((res) => {
					setCards(res)
				})
				.catch((err) => {
					console.log(`Устал искать что не так! Ошибка ${err}`);
				});
		}
	}, [loggedIn, token]);
	*/

	useEffect(() => {
		if (loggedIn) {
			//const token = localStorage.getItem('jwt');
			setToken(localStorage.getItem('jwt'))
			if (token) {
				Promise.all([api.getUserInfo(token), api.getCards(token)])
					.then(([apiUser, apiCards]) => {
						setCurrentUser(apiUser);
						setUserEmail(apiUser.email);
						setCards(apiCards.reverse());
						navigate('/');
					})
					.catch((err) => console.log(err));
			}
		}
	}, [loggedIn, navigate, token])

	function handleShowIllustrationClick(card) {
		setSelectedCard(card)
	};

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true)
	};

	function handleEditProfileClick() {
		setIsEditInfoPopupOpen(true)
	};

	function handleAddCardClick() {
		setIsAddCardPopupOpen(true)
	};

	//function handleConfirmClick() { setIsConfirmPopupOpen(true) };

	function closeThisPopup() {
		setIsEditAvatarPopupOpen(false);
		setIsEditInfoPopupOpen(false);
		setSuccessRegistration(false);
		setIsAddCardPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard({});
	};

	function logout() {
		localStorage.removeItem('jwt')
		setUserEmail('')
		setLoggedIn(false)
	}

	function handleSubmitLogin({ password, email }) {
		return auth.authorization(password, email)
			.then((res) => {
				if (typeof (res.token) === 'string') {
					localStorage.setItem('jwt', res.token)
					//setToken(localStorage.getItem('jwt'));
					//setLoggedIn(true)
					//setCurrentUser(res.user)
					//setUserEmail(res.user.email)
					checkToken()
				} else if (res.status === 401 || 400) {
					setSuccessOrError(true)
					setSuccessOrErrorMessage('Неверный пароль или емейл')
					setSuccessRegistration(true)
					setTimeout(() => {
						setSuccessRegistration(false)
					}, 3000)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function checkToken() {
		const token = localStorage.getItem("jwt")
		if (token) {
			auth.validation(token)
				.then(() => {
					setLoggedIn(true);
				})
				.catch(() => {
					setSuccessOrError(true)
					setSuccessOrErrorMessage('Валидация на сервере не пройдена')
					setSuccessRegistration(true)
					setTimeout(() => {
						setSuccessRegistration(false)
					}, 3000)
				})
		}
	};

	function handleSubmitRegistration({ password, email, confirmPassword }) {
		if (password !== confirmPassword) {
			setSuccessOrError(true)
			setSuccessOrErrorMessage('Пароли не совпадают')
			setSuccessRegistration(true)
			setTimeout(() => {
				setSuccessRegistration(false)
			}, 3000)
		} else {
			auth.registration(password, email)
				.then((res) => {
					if (res.name === 'Жак-Ив Кусто' && password === confirmPassword) {
						setSuccessOrError(false)
						setSuccessOrErrorMessage('Вы успешно зарегистрировались')
						setSuccessRegistration(true)
						setTimeout(() => {
							setSuccessRegistration(false)
						}, 3000)
						navigate('/sign-in')
					} else if (res.status === 400 || 409) {
						setSuccessOrError(true)
						setSuccessOrErrorMessage('Пользователь с таким емайлом уже зарегистрирован')
						setSuccessRegistration(true)
						setTimeout(() => {
							setSuccessRegistration(false)
						}, 3000)
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i === currentUser._id);
		let apiMethod;
		if (!isLiked) {
			apiMethod = api.likeCard(card._id, token)
		} else {
			apiMethod = api.dislikeCard(card._id, token)
		}
		apiMethod
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch((err) => console.log(err))
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards((res) => (res.filter((item) => item._id !== card._id)))
			})
			.catch((err) => console.log(err))
	}

	function handleUpdateUser({ name, about }) {
		api.setUserInfo(name, about, token)
			.then((res) => {
				setCurrentUser(res)
				closeThisPopup()
			})
			.catch((err) => console.log(err))
	}

	function handleUpdateAvatar({ avatar }) {
		api.setAvatar(avatar, token)
			.then((res) => {
				setCurrentUser(res)
				closeThisPopup()
			})
			.catch((err) => console.log(err))
	}

	function handleAddNewCard({ name, link }) {
		api.setCard(name, link, token)
			.then((res) => {
				setCards([res, ...cards])
				closeThisPopup()
			})
			.catch((err) => console.log(err))
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">

				<Header
					loggedIn={loggedIn}
					logout={logout}
					userEmail={userEmail}
				/>

				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute loggiedIn={loggedIn}>
								<Main
									cards={cards}
									likeClick={handleCardLike}
									deleteClick={handleCardDelete}
									cardClick={handleAddCardClick}
									avatarClick={handleEditAvatarClick}
									profileClick={handleEditProfileClick}
									illustrationClick={handleShowIllustrationClick}
								/>
							</ProtectedRoute>
						}
					/>

					<Route
						path="/sign-in"
						element={
							<Login
								handleSubmitLogin={handleSubmitLogin}
							/>
						}
					/>

					<Route
						path="/sign-up"
						element={
							<Register
								handleSubmitRegistration={handleSubmitRegistration}
							/>
						}
					/>

					<Route
						exact
						path="*"
						element={
							loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
						}
					/>
				</Routes>

				<Footer />

				<PopupTypeAvatar
					onUpdateAvatar={handleUpdateAvatar}
					open={isEditAvatarPopupOpen}
					close={closeThisPopup}
				/>

				<PopupTypeInfo
					onUpdateUser={handleUpdateUser}
					open={isEditInfoPopupOpen}
					close={closeThisPopup}
				/>

				<PopupTypeAddCard
					onAddNewCard={handleAddNewCard}
					open={isAddCardPopupOpen}
					close={closeThisPopup}
				/>

				<PopupTypeConfirm
					open={isConfirmPopupOpen}
					close={closeThisPopup}
				/>

				<ImagePopup
					card={selectedCard}
					close={closeThisPopup}
				/>

				<InfoTooltip
					open={successRegistration}
					close={closeThisPopup}
					successOrError={successOrError}
					successOrErrorMessage={successOrErrorMessage}
				/>

			</div >
		</CurrentUserContext.Provider>
	);
}

export default App;