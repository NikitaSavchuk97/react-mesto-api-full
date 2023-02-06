import { Routes, Route, Link, Navigate } from "react-router-dom";

function Header({ loggedIn, logout, userEmail }) {


	return (
		<header className="header">
			<a className="header__logo" href="https://snv-project-mesto.ru"></a>

			<h3 className="header__email">{userEmail}</h3>
			<Routes >
				<Route
					path="/"
					element={
						loggedIn ?
							<Link to='/sign-in' className='header__login' onClick={logout}>
								Выйти
							</Link>
							:
							<Navigate
								to='/sign-in'
							/>
					}
				/>

				<Route
					path='/sign-up'
					element={
						<Link to='/sign-in' className='header__login'>
							Войти
						</Link>
					}
				/>

				<Route
					path='/sign-in'
					element={
						<Link to='/sign-up' className='header__login'>
							Зарегистрироваться
						</Link>
					}
				/>
			</Routes>
		</header >
	);
}

export default Header;