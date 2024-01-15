import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge, Fab } from '@mui/material'
import { useAuth } from '../context/AuthContextProvider'
import { useCart } from '../context/CartContextProvider'
import { ADMIN } from '../../helpers/const'
import { Add, Bookmark } from '@mui/icons-material'
import { useFavorite } from '../context/FavoriteContextProvider'
const pages = [
	{ id: 1, title: 'Книги', link: '/books' },
	{ id: 2, title: 'About', link: '/about' },
	{ id: 3, title: 'Contacts', link: '/contacts' },
]

function Navbar() {
	const { favorites } = useFavorite()
	const hasFavorites = favorites >= 0
	const {
		handleLogout,
		user: { email },
	} = useAuth()
	const navigate = useNavigate()
	const handleLogoutClick = () => {
		handleLogout() // Вызываем функцию logout из вашего AuthContextProvider
		navigate('/login') // Перенаправляем пользователя на страницу логина
		handleCloseUserMenu()
	}

	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorElUser, setAnchorElUser] = React.useState(null)
	const { getBooksCountInCart, addBookToCart } = useCart()
	const [badgeCount, setBadgeCount] = React.useState(0)

	React.useEffect(() => {
		setBadgeCount(getBooksCountInCart())
	}, [addBookToCart])

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	return (
		<AppBar
			style={{ backgroundColor: 'black', color: 'white' }}
			position='static'
		>
			<Container maxWidth='xl'>
				<Toolbar style={{ color: 'black' }} disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							fontSize: 40,
							letterSpacing: '.3rem',
							color: 'white',
							textDecoration: 'none',
						}}
					>
						Лабиринт
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						></IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<Link key={page.id} to={page.link}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign='center'>{page.title}</Typography>
									</MenuItem>
								</Link>
							))}
							{email === ADMIN ? (
								<Link to={'/admin'}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign='center'>a.</Typography>
									</MenuItem>
								</Link>
							) : null}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						logo
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Link key={page.id} to={page.link}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.title}
								</Button>
							</Link>
						))}
						{email === ADMIN ? (
							<Link to={'/admin'}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'red', display: 'block' }}
								>
									<Add />
								</Button>
							</Link>
						) : null}
					</Box>
					<Box sx={{ flexGrow: 0, ml: 2, mr: 2 }}>
						<Link to={'/favorite'}>
							<Tooltip title='Избранное'>
								<IconButton sx={{ p: 0 }}>
									{hasFavorites ? (
										<Bookmark sx={{ color: 'white' }} />
									) : (
										<Bookmark sx={{ color: 'white' }} />
									)}
								</IconButton>
							</Tooltip>
						</Link>
					</Box>
					<Box sx={{ flexGrow: 0, ml: 2, mr: 2 }}>
						<Link to={'/cart'}>
							<Badge badgeContent={badgeCount} color='success'>
								<ShoppingCartIcon sx={{ color: 'white' }} />
							</Badge>
						</Link>
					</Box>
					<Box sx={{ flexGrow: 0, ml: 2, mr: 2 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt=''
									src='https://cdn.pixabay.com/photo/2023/12/09/10/09/woman-8438999_1280.png'
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<Typography sx={{ color: 'black' }}>
								{email ? `${email}` : 'Guest'}
							</Typography>
							{email ? (
								<Link to={'/auth'}>
									<MenuItem
										onClick={() => {
											handleLogoutClick()
											handleCloseUserMenu()
										}}
									>
										<Typography textAlign='center'>Выход</Typography>
									</MenuItem>
								</Link>
							) : (
								<Link to={'/auth'}>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign='center'>Вход</Typography>
									</MenuItem>
								</Link>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Navbar
