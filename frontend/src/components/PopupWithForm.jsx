import { useEffect } from "react";

function PopupWithForm({ name, title, open, close, children, type, submit }) {
	//console.log(name, title, open, close, children, type, text, submit);

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
		open && document.addEventListener('keydown', closeOnEsc);
	}, [open]);

	return (
		<div className={`popup popup_${name} ${open ? 'popup_active' : ''}`}>
			<div className={`popup__container ${type}`}>
				<button type="button" onClick={handleOverlayClose} className="popup__close"></button>
				<h2 className="popup__title">{title}</h2>
				<form className="popup__form" onSubmit={submit} name={`${name}-form`} method="post" noValidate>
					{
						children
					}
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm;