import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ cards, cardClick, avatarClick, profileClick, illustrationClick, likeClick, deleteClick }) {

	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__blanket">
					<img className="profile__avatar" src={currentUser.avatar} alt="Фото пользователя"></img>
					<button type="button" onClick={avatarClick} className="profile__edit-btn"></button>
				</div>

				<div className="profile-info">
					<h1 className="profile-info__name">{currentUser.name}</h1>
					<button type="button" onClick={profileClick} className="profile-info__edit-button"></button>
					<p className="profile-info__title">{currentUser.about}</p>
				</div>
				<button type="button" onClick={cardClick} className="add-button"></button>
			</section>

			<section className="elements">
				{
					cards.map((card) => (
						<Card
							card={card}
							illustrationClick={illustrationClick}
							onCardLike={likeClick}
							onCardDelete={deleteClick}
							key={card._id}
						/>
					))
				}
			</section>
		</main >
	);
}

export default Main;