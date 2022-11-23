import PopupWithForm from "./PopupWithForm";

function PopupTypeConfirm ({open, close}) {
  return (
    <PopupWithForm title='Вы уверены?' name='type_delete' open={open} close={close} type='popup__container_type_delete' text={'Удалить'}>

      <h2 className="popup__title">Вы уверены?</h2>
      <button type="submit" className="popup__save-button">Удалить</button>

    </PopupWithForm>
  )
}

export default PopupTypeConfirm;