import { useEffect } from "react";

function ImagePopup({ card, close }) {

	function handleOverlayClose(evt) {
		if (evt.target === evt.currentTarget) {
			close();
			document.removeEventListener('keydown', closeOnEsc);
		}
	}

	function closeOnEsc(evt) {
		if (evt.key === 'Escape') {
			close();
			document.removeEventListener('keydown', closeOnEsc);
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', closeOnEsc);
	}, [card]);

	return (
		<div className={`popup popup_type_illustration ${card.link && 'popup_active'}`}>
			<div className="popup__illustration">
				<button type="button" onClick={handleOverlayClose} className="popup__close"></button>
				<img className="popup__image" src={card.link} alt={card.name} />
				<p className="popup__subtitle">{card.name}</p>
			</div>
		</div>
	)
}

export default ImagePopup;