import { useState } from 'react'

function Register({ handleSubmitRegistration }) {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	function handleConfirmPasswordChange(e) {
		setConfirmPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		handleSubmitRegistration({ password, email, confirmPassword })
	}

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h2 className="login__title">Регистрация</h2>
			<input
				onChange={handleEmailChange}
				className="login__input"
				type="email"
				placeholder="емейл"
				autoComplete="on"
			/>
			<input
				onChange={handlePasswordChange}
				className="login__input"
				type="password"
				placeholder="пароль"
				autoComplete="on"
			/>
			<input
				onChange={handleConfirmPasswordChange}
				className="login__input"
				type="password"
				placeholder="повторите пароль"
				autoComplete="on"
			/>
			<button className="login__submit" type="submit">Зарегистрироваться</button>
		</form >
	)
}

export default Register;