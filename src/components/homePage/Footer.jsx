import React from 'react'
import FooterHTML from './footer.html'; 

const Footer = () => {
  return (
    <div>
       <div dangerouslySetInnerHTML={{ __html: FooterHTML }} />
    </div>
  )
}

export default Footer
