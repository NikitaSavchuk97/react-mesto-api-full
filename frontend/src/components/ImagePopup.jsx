function ImagePopup ({card, close}) {
  return (
    <div className={`popup popup_type_illustration ${card.link && 'popup_active'}`}>
      <div className="popup__illustration">
        <button type="button" onClick={close} className="popup__close"></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;