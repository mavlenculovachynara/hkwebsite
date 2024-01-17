import React from 'react'

import Navbar from './components/homePage/Navbar'
import MainRoutes from './routes/MainRoutes'
import Footer from './components/homePage/Footer'
const App = () => {
	return (
		<div>
			<Navbar />
			<MainRoutes />
			{/* <Footer/> */}
		</div>
	)
}

export default App
