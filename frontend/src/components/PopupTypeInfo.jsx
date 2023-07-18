import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from '../utils/formValidation';

function PopupTypeInfo({ open, close, onUpdateUser }) {

	const [name, setName] = useState('')
	const [about, setAbout] = useState('')
	const currentUser = useContext(CurrentUserContext);
	const { handleChange, errors, isValid, forceValidationChange } = useFormValidation();

	useEffect(() => {
		errors.name = '';
		errors.job = '';
		setName(currentUser.name)
		setAbout(currentUser.about)
	}, [currentUser, open,errors]);

	function handleNameChange(evt) {
		handleChange(evt)
		setName(evt.target.value)
	}

	function handleAboutChange(evt) {
		handleChange(evt)
		setAbout(evt.target.value)
	}

	function handleAddNewInfo(evt) {
		handleSubmit(evt)
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateUser({
			name,
			about
		});
		forceValidationChange();
	}

	return (
		<PopupWithForm name='type_info' title='Редактировать профиль' open={open} close={close} type='' text={'Сохранить'} submit={handleAddNewInfo}>
			<input
				value={name}
				onChange={handleNameChange}
				className="popup__name popup__input"
				id="name-input"
				type="text"
				name="name"
				placeholder="Ваше имя"
				autoComplete="off"
				minLength="2"
				maxLength="40"
				required
			/>

			<span
				className={
					`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_type_active' : ''}`
				}>
				{errors.name}
			</span>

			<input
				value={about}
				onChange={handleAboutChange}
				className="popup__about popup__input"
				id="about-input"
				type="text"
				name="job"
				placeholder="О себе"
				autoComplete="off"
				minLength="2"
				maxLength="200"
				required
			/>
			<span
				className={
					`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_type_active' : ''}`
				}>
				{errors.job}
			</span>

			<button
				type="submit"
				disabled={!isValid}
				className={
					`popup__save-button ${isValid ? '' : 'popup__save-button_disabled'}`
				}
			>
				{'Сохранить'}
			</button>
		</PopupWithForm>
	)
}

export default PopupTypeInfo;