import * as React from 'react'
import { styled, alpha } from '@mui/material/styles';
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
import InputBase from '@mui/material/InputBase';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Fab, TextField } from '@mui/material'
import { useAuth } from '../context/AuthContextProvider'
import { useCart } from '../context/CartContextProvider'
import { ADMIN } from '../../helpers/const'
import { Add, Bookmark } from '@mui/icons-material'
import { useFavorite } from '../context/FavoriteContextProvider'
import { useEffect } from 'react';
import { useBooks } from '../context/BookContextProvider';
import { useState } from 'react';
const pages = [
	{ id: 1, title: 'Каталог', link: '/books' },
	{ id: 2, title: 'О нас', link: '/about' },
	// { id: 3, title: 'Contacts', link: '/contacts' },
]

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: 'rgba(255, 255, 255, 1)',
	'&:hover': {
	  backgroundColor: 'rgba(255, 255, 255, 0.65)', 
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
	  marginLeft: theme.spacing(3),
	  width: '50ch',
	},
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 1, 1, 0),
	  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	  transition: theme.transitions.create('width'),
	  width: '100%',
	  [theme.breakpoints.up('md')]: {
		width: '20ch',
	  },
	},
  }));

function Navbar() {


	const { genre, getGenres, fetchByParams } = useBooks()
	const [searchParams, setSearchParams] = useSearchParams()
	const [search, setSearch] = useState(searchParams.get('q') || '')
	useEffect(() => {
		getGenres()
	}, [])
	useEffect(() => {
		setSearchParams({
			q: search,
		})
	}, [search])



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
			style={{ backgroundColor: '#212123', color: 'white' }}
			position='static'
		>
			<Container maxWidth='xl'>
				<Toolbar style={{ color: 'black' }} disableGutters>
				<Avatar
    alt="Лабиринт Icon"
    src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 3h-7a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 3H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5.758a2.01 2.01 0 0 1 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.08.182.15.294.196h.002a.996.996 0 0 0 .762 0h.002c.112-.046.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.01 2.01 0 0 1 15.242 20H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 15h-4.758a4.03 4.03 0 0 0-2.242.689V6c0-.551.448-1 1-1h6v13z' fill='%2394089e' class='fill-000000'%3E%3C/path%3E%3C/svg%3E"
    sx={{ width: 70, height: 70, marginRight: 2 }}
  />
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 600,
							fontSize: 30,
							letterSpacing: '.3rem',
							color: 'white',
							textDecoration: 'none',
						}}
					>
						LABYRINTH
					</Typography>

					<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
			onChange={e => setSearch(e.target.value)}
              placeholder="поиск по Лабиринту"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>


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