import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
import useFormValidation from '../utils/formValidation';

function PopupTypeAvatar({ open, close, onUpdateAvatar }) {

	const avatarInput = useRef('');

	const { handleChange, errors, isValid, forceValidationChange } = useFormValidation();

	function handleLinkInput(evt) {
		handleChange(evt);
	}

	function handleAvatarChange(evt) {
		evt.preventDefault();
		onUpdateAvatar({ avatar: avatarInput.current.value });
		forceValidationChange();
	}

	useEffect(() => {
		errors.avatar = ''
		avatarInput.current.value = '';
	}, [open,errors])

	return (
		<PopupWithForm name='type_avatar' title='Обновить аватар' open={open} close={close} type='popup__container_type_avatar' submit={handleAvatarChange} >
			<input
				ref={avatarInput}
				onChange={handleLinkInput}
				className="popup__name popup__input"
				id="avatar-input"
				type="url"
				name="avatar"
				placeholder="Ссылка на изображение"
				autoComplete="off"
				minLength="2"
				required
			/>

			<span
				className={
					`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_type_active' : ''}`
				}>
				{errors.avatar}
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

		</PopupWithForm >
	)
}

export default PopupTypeAvatar;