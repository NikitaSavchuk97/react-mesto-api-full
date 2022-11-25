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
	const [successOrError, setSuccessOrError] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();

	const token = localStorage.getItem("jwt");

	function handleShowIllustrationClick(card) { setSelectedCard(card) };
	function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) };
	function handleEditProfileClick() { setIsEditInfoPopupOpen(true) };
	function handleAddCardClick() { setIsAddCardPopupOpen(true) };
	//function handleConfirmClick() { setIsConfirmPopupOpen(true) };

	function closeThisPopup() {
		setIsEditAvatarPopupOpen(false);
		setIsEditInfoPopupOpen(false);
		setSuccessRegistration(false);
		setIsAddCardPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard({});
	};

	useEffect(() => {
		if (loggedIn) {
			Promise.all([api.getUserInfo(token), api.getCards(token)])
				.then(([apiUser, apiCards]) => {
					setCurrentUser(apiUser)
					setCards(apiCards)
				})
				.catch((err) => console.log(err));
		}
	}, [loggedIn, token]);

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (token) {
			auth.validation(token)
				.then((res) => {
					setUserEmail(res.data.email)
					setLoggedIn(true);
					navigate("/");
				})
				.catch(() => {
					setSuccessOrError(true)
					setSuccessOrErrorMessage('Неверный пароль или емейл')
					//setSuccessRegistration(true)
					setTimeout(() => {
						setSuccessRegistration(false)
					}, 3000)
				})
		}
	}, [navigate]);


	function logout() {
		localStorage.removeItem('token')
		setUserEmail('')
		setLoggedIn(false)
	}

	function handleSubmitLogin(data) {
		return auth.authorization(data)
			.then((res) => {
				console.log(JSON.stringify(res))
				localStorage.setItem('jwt', 'yandex')
				navigate('/')
				return res.token
			})
			.catch((err) => console.log(err));
	}

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
					if (res.status === 400) {
						setSuccessOrError(true)
						setSuccessOrErrorMessage('Пользователь с таким емайлом уже зарегистрирован')
						setSuccessRegistration(true)
						setTimeout(() => {
							setSuccessRegistration(false)
						}, 3000)
					} else if (password === confirmPassword) {
						setSuccessOrError(false)
						setSuccessOrErrorMessage('Вы успешно зарегистрировались')
						setSuccessRegistration(true)
						setTimeout(() => {
							setSuccessRegistration(false)
						}, 3000)
						navigate('/sign-in')
					}
				})
		}
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		let apiMethod;
		if (!isLiked) {
			apiMethod = api.likeCard(card._id, !isLiked)
		} else {
			apiMethod = api.dislikeCard(card._id, !isLiked)
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

	function handleUpdateUser(data) {
		api.setUserInfo(data)
			.then((res) => {
				setCurrentUser(res)
				closeThisPopup()
			})
			.catch((err) => console.log(err))
	}

	function handleUpdateAvatar(data) {
		api.setAvatar(data)
			.then((res) => {
				setCurrentUser(res)
				closeThisPopup()
			})
			.catch((err) => console.log(err))
	}

	function handleAddNewCard(data) {
		api.setCard(data)
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