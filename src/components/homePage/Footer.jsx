import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#191919', color: 'white', padding: '40px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Social Icons Container */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div className="links social-icon-item">
                  <IconButton href="https://www.facebook.com/" target="_blank" style={{ color: 'white' }}>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" >Facebook</Typography>

                  {/* БЛОК */}
                  <IconButton href="" target="_blank" style={{ color: '#191919' }}>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" fontSize={'17'} color={'white'}>Payment Methods:</Typography>
                  {/* БЛОК */}

                  <IconButton href="https://www.visa.com.ru/" target="_blank" style={{ color: 'white' }}>
                    <img src="https://www.svgrepo.com/show/328144/visa.svg" width={'50px'} height={'50px'} alt="" />
                  </IconButton>
                  <Typography marginLeft={'12px'} variant="body2">VISA</Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="links social-icon-item">
                  <IconButton href="https://twitter.com/" target="_blank" style={{ color: 'white' }}>
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2">Twitter</Typography>

                {/*БЛОК  */}
                <IconButton href="" target="_blank" style={{ color: '#191919' }}>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" color={'#191919'}>Facebook</Typography>
                  {/*БЛОК  */}


                  <IconButton href="https://www.mastercard.com/global/en.html" target="_blank" style={{ color: 'white' }}>
                    <img src="https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1225-3kb6axel.png" width={'60px'} height={'40px'}  alt="" />
                  </IconButton>
                  <Typography variant="body2">MaterCart</Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="links social-icon-item">
                <IconButton href="https://www.instagram.com/_bokutomarryme/" target="_blank" style={{ color: 'white' }}>
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2">Instagram</Typography>

                  {/* БЛОК */}
                  <IconButton href="" target="_blank" style={{ color: '#191919' }}>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" color={'#191919'}>Facebook</Typography>
                  {/*БЛОК */}


                  <IconButton href="https://mbank.kg/?ysclid=lrhrwkcupa621558814" target="_blank" style={{ color: 'white' }}>
                  <img src="https://mbank.kg/media/logo/Frame_4.png" width={'50px'} height={'40px'}/>
                  </IconButton>
                  <Typography marginLeft={'12px'} variant="body2">Mbank</Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="links social-icon-item">
                  <IconButton href="mailto:example@example.com" target="_blank" style={{ color: 'white' }}>
                    <EmailIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2">Email</Typography>

                 {/* БЛОК */}
                 <IconButton href="" target="_blank" style={{ color: '#191919' }}>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" color={'#191919'}>Facebook</Typography>
                  {/* БЛОК */}


                  <IconButton href="https://dengi.kg/ru" target="_blank" style={{ color: 'white' }}>
                  <img src="https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/b6/30/fd/b630fdb5-bece-08fe-e225-73bf5edff015/source/512x512bb.jpg" width={'50px'} height={'40px'}/>
                  </IconButton>
                  <Typography variant="body2">O!деньги</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>

          {/* Google Map Container */}
          <Grid item xs={12} md={6}>
            <div
              id="cartG"
              style={{
                width: '100%',
                height: '300px',
                overflow: 'hidden',
                borderRadius: '10px',
                border: '5px solid white',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d614.7389247411738!2d74.58682374064455!3d42.86846193035757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1705389902880!5m2!1sru!2skg"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Grid>
        </Grid>

        {/* Additional Text */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body1">
            All rights reserved. Copying any site materials are prohibited! All product and game names, company and
            brand names, logos, trademarks, and other materials are the property of their respective owners. Only license
            keys for all gaming platforms: Steam, Uplay, Battle.net, Origin, and others. Profitable, reliable, and fast!
          </Typography>
          <Typography variant="h6" style={{ marginTop: '10px', color: '#94089E' }}>
            LABYRINTH - ваш лучший выбор!
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
