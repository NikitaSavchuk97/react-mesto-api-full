import __success from '../images/__success.svg'
import __error from '../images/__error.svg'

function InfoTooltip({ open, close, successOrError, successOrErrorMessage }) {
	return (
		<div className={`popup popup_type_status ${open ? 'popup_active' : ''}`}>
			<div className="popup__container">
				<button onClick={close} className="popup__close" type="button"></button>
				<img className="popup__status" src={successOrError ? __error : __success} alt={successOrErrorMessage} />
				< h2 className="popup__title">{successOrErrorMessage}</h2>
			</div>
		</div>
	)
}

export default InfoTooltip;