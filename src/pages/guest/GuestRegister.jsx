const GuestRegister = () => {
	return (
		<div>
			<h1>Register</h1>
			<form>
				<div>
					<label htmlFor='username'>Username:</label>
					<input type='text' id='username' name='username' />
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input type='password' id='password' name='password' />
				</div>
				<button type='submit'>Register</button>
			</form>
		</div>
	)
}

export default GuestRegister
