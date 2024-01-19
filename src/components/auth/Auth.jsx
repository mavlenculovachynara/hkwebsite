import * as React from 'react'

import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button } from '@mui/material'

import { useAuth } from '../context/AuthContextProvider'

const defaultTheme = createTheme()

const Auth = () => {
	const {
		user,
		email,
		password,
		emailError,
		passwordError,
		handleRegister,
		handleLogin,
		setEmail,
		setPassword,
		hasAccount,
		setHasAccount,
		isAdmin,
	} = useAuth()

	const handleSubmit = e => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		})

		handleRegister(data.get('username'))
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<Avatar src='https://avatars.mds.yandex.net/i?id=e66b7d4d5b11563dd60b42bb1dacbf85bbebb890-9821502-images-thumbs&n=13' />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{hasAccount ? 'Вход в аккаунт' : 'Регистрация'}
					</Typography>
					<Box
						onSubmit={handleSubmit}
						component='form'
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							value={email || ''}
							onChange={e => setEmail(e.target.value)}
							helperText={emailError}
							margin='normal'
							required
							fullWidth
							id='email'
							label='Почта'
							name='email'
							autoComplete='email'
						/>
						<TextField
							value={password}
							onChange={e => setPassword(e.target.value)}
							helperText={passwordError}
							margin='normal'
							required
							fullWidth
							name='password'
							label='Пароль'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						{hasAccount ? (
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{
									mt: 3,
									mb: 2,
									backgroundColor: 'purple',
									color: 'primary',
								}}
							>
								Вход
							</Button>
						) : (
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{
									mt: 3,
									mb: 2,
									backgroundColor: 'purple',
									color: 'primary',
								}}
							>
								Регистрация
							</Button>
						)}
						<Grid container>
							<Grid item>
								<Typography
									onClick={() => setHasAccount(!hasAccount)}
									variant='body2'
									sx={{ cursor: 'pointer', textDecoration: 'underline' }}
								>
									{hasAccount
										? 'У вас нет учетной записи? Зарегистрируйтесь сейчас'
										: 'У вас уже есть учетная запись? Авторизоваться'}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Auth
