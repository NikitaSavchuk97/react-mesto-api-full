import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';

function PopupTypeAddCard({ open, close, onAddNewCard }) {

	const newCardTitleInput = useRef('');
	const newCardUrlInput = useRef('');

	function handleSubmit(evt) {
		evt.preventDefault()
		onAddNewCard({ name: newCardTitleInput.current.value, link: newCardUrlInput.current.value })
	}

	function handleAddNewCard(evt) {
		handleSubmit(evt)
	}

	return (
		<PopupWithForm name='type_photo' title='Новое место' open={open} close={close} type='' text={'Добавить'} submit={handleAddNewCard}>
			<input
				ref={newCardTitleInput}
				className="popup__name popup__input"
				id="spot-input"
				type="text"
				name="name"
				placeholder="Название"
				autoComplete="off"
				minLength="2"
				required
			/>
			<span className="popup__input-error spot-input-error"></span>

			<input
				ref={newCardUrlInput}
				className="popup__about popup__input"
				id="url-input"
				type="url"
				name="link"
				placeholder="Ссылка на картинку"
				autoComplete="off"
				minLength="2"
				required
			/>
			<span className="popup__input-error url-input-error"></span>
		</PopupWithForm>
	)
}

export default PopupTypeAddCard;