import * as React from "react";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import { useAuth } from "../context/AuthContextProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ваш сайт
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Auth() {
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
  } = useAuth();
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            {hasAccount ? "Авторизация" : "Регистрация"}
          </Typography>
          <Box
            onSubmit={handleSubmit}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Адрес"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {hasAccount ? (
              <Button
                onClick={handleLogin}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Логин
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Регистрация аккаунта
              </Button>
            )}
            <Grid container>
              <Grid item>
                <Typography
                  onClick={() => setHasAccount(!hasAccount)}
                  variant="body2"
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {hasAccount
                    ? "don`t have account? register now"
                    : "already have an account? login"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
		  </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}