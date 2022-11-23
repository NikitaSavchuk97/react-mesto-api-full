import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function PopupTypeAvatar({ open, close, onUpdateAvatar }) {

	const avatarInput = useRef('')

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateAvatar({ avatar: avatarInput.current.value });
	}

	function handleAvatarChange(evt) {
		handleSubmit(evt)
	}

	return (
		<PopupWithForm name='type_avatar' title='Обновить аватар' open={open} close={close} type='popup__container_type_avatar' text={'Сохранить'} submit={handleAvatarChange} >
			<input
				ref={avatarInput}
				className="popup__name popup__input"
				id="avatar-input"
				type="url"
				name="avatar"
				placeholder="Ссылка на изображение"
				autoComplete="off"
				minLength="2"
				required
			/>
			<span className="popup__input-error avatar-input-error"></span>
		</PopupWithForm>
	)
}

export default PopupTypeAvatar;