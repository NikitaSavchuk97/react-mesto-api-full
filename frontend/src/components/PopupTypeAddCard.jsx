import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from 'react';
import useFormValidation from '../utils/formValidation';

function PopupTypeAddCard({ open, close, onAddNewCard }) {

	const newCardTitleInput = useRef('');
	const newCardUrlInput = useRef('');
	const { handleChange, errors, isValid, forceValidationChange } = useFormValidation();

	function handleNameInput(evt) {
		handleChange(evt);
	}

	function handleLinkInput(evt) {
		handleChange(evt);
	}

	function handleAddNewCard(evt) {
		handleSubmit(evt)
	}

	function handleSubmit(evt) {
		evt.preventDefault()
		onAddNewCard({ name: newCardTitleInput.current.value, link: newCardUrlInput.current.value })
		forceValidationChange();
	}

	useEffect(() => {
		errors.name = '';
		errors.link = '';
		newCardTitleInput.current.value = '';
		newCardUrlInput.current.value = '';
	}, [open]);

	return (
		<PopupWithForm name='type_photo' title='Новое место' open={open} close={close} type='' submit={handleAddNewCard}>

			<input
				ref={newCardTitleInput}
				onChange={handleNameInput}
				className="popup__name popup__input"
				id="spot-input"
				type="text"
				name="name"
				placeholder="Название"
				autoComplete="off"
				minLength="2"
				required
			/>

			<span
				className={
					`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_type_active' : ''}`
				}>
				{errors.name}
			</span>

			<input
				ref={newCardUrlInput}
				onChange={handleLinkInput}
				className="popup__about popup__input"
				id="url-input"
				type="url"
				name="link"
				placeholder="Ссылка на картинку"
				autoComplete="off"
				minLength="2"
				required
			/>

			<span
				className={
					`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_type_active' : ''}`
				}>
				{errors.link}
			</span>

			<button
				type="submit"
				disabled={!isValid}
				className={
					`popup__save-button ${isValid ? '' : 'popup__save-button_disabled'}`
				}
			>
				{'Добавить'}
			</button>

		</PopupWithForm>
	)
}

export default PopupTypeAddCard;