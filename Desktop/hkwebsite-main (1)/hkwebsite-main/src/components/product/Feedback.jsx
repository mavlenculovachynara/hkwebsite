import React from 'react'
import Typography from '@mui/material/Typography'

const Feedback = React.memo(({ comments }) => (
	<div>
		{comments.map((comment, index) => (
			<Typography key={index}>{comment.text}</Typography>
		))}
	</div>
))

export default Feedback