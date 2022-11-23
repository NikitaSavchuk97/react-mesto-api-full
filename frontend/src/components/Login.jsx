import { useState } from 'react'

function Login({ handleSubmitLogin }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		handleSubmitLogin(password, email)
	}

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h2 className="login__title">Вход</h2>
			<input
				onChange={handleEmailChange}
				className="login__input"
				type="email"
				placeholder="емейл"
			/>
			<input
				onChange={handlePasswordChange}
				className="login__input"
				type="password"
				placeholder="пароль"
			/>
			<button className="login__submit" type="submit">
				Войти
			</button>
		</form>
	)
}

export default Login