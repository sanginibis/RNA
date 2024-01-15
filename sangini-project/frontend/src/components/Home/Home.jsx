import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const cards = [1, 2, 3];


export default function Home() {
  return (
    <>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container
            maxWidth="l"
            sx={{
              paddingTop:'40px',
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              What is RNA Sequencing?
            </Typography>
            <Typography variant="h6" align="center" color="text.primary" paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero? Numquam eveniet mollitia nam saepe,
              deleniti quae reiciendis voluptates consequatur, natus cupiditate blanditiis iste ea esse, amet delectus aut culpa?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero? Numquam eveniet mollitia nam saepe,
              deleniti quae reiciendis voluptates consequatur, natus cupiditate blanditiis iste ea esse, amet delectus aut culpa?
              
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero? Numquam eveniet mollitia nam saepe,
              deleniti quae reiciendis voluptates consequatur, natus cupiditate blanditiis iste ea esse, amet delectus aut culpa?
            </Typography>
            <Typography variant="h8" align="center" color="text.secondary" paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero? Numquam eveniet mollitia nam saepe,
              deleniti quae reiciendis voluptates consequatur, natus cupiditate blanditiis iste ea esse, amet delectus aut culpa?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero? Numquam eveniet mollitia nam saepe,
              deleniti quae reiciendis voluptates consequatur, natus cupiditate blanditiis iste ea esse, amet delectus aut culpa?
              
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vero? Numquam eveniet mollitia nam saepe,
              deleniti quae reiciendis voluptates consequatur, natus cupiditate blanditiis iste ea esse, amet delectus aut culpa?
            </Typography>
            <Stack
              sx={{ pt: 3 }}
              direction="row"
              spacing={5}
              justifyContent="center"
            >
              <Button variant="contained">Login</Button>
              <Button variant="outlined">Signup</Button>
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="ml">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse temporibus ab veniam alias quis culpa eligendi autem sint odit adipisci.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}