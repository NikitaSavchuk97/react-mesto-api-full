import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card({ card, illustrationClick, onCardLike, onCardDelete }) {

	const currentUser = useContext(CurrentUserContext);

	const isOwn = card.owner === currentUser._id;
	const cardDeleteButtonClassName = `
	${isOwn ?
			'element__delete'
			:
			'element__delete_hidden'
		}
	`

	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = `
	${isLiked ?
			'element__like_active'
			:
			'element__like'
		}
	`

	function handleIllustrationClick() {
		illustrationClick(card)
	}

	function handleLikeClick() {
		onCardLike(card)
	}

	function handleDeleteClick() {
		onCardDelete(card)
	}

	return (
		<article className="element">
			<img className="element__photo" src={card.link} alt={card.name} onClick={handleIllustrationClick} />
			<h2 className="element__title">{card.name}</h2>
			<button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
			<p className="element__counter">{card.likes.length}</p>
			<button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
		</article>
	)
}

export default Card;