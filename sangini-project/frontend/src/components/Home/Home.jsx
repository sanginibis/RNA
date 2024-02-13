import * as React from 'react';
import { useNavigate } from 'react-router-dom';

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


export default function Home({isLoggedin}) {
  const navigate = useNavigate();

  const loginClick = (e) => {
    return (navigate("/login", { replace: true }));
  }

  const signupClick = (e) => {
    return (navigate("/signup", { replace: true }));
  }

  const dashboardClick = (e) => {
    return (navigate("/dashboard", { replace: true }));
  }

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
            Ribonucleic acid (RNA) is a nucleic acid present in all living cells that has structural 
            similarities to DNA. Unlike DNA, however, RNA is single-stranded. An RNA molecule has a 
            backbone made of alternating phosphate groups and the sugar ribose, rather than the deoxyribose found 
            in DNA. Attached to each sugar is one of four bases: adenine (A), uracil (U), cytosine (C) or guanine (G). 
            </Typography>
            <Typography variant="h8" align="center" color="text.secondary" paragraph>
              RNA sequencing is a technique that can examine the quantity and sequences of RNA in a sample using 
              next-generation sequencing (NGS).
              RNA sequencing lets us investigate and discover the transcriptome, the total cellular content of 
              types of RNAs: mRNA, rRNA and tRNA. Understanding the transcriptome is key to connect the 
              information in our genome with its functional protein. It can tell us which genes are turned on 
              in a cell, what their level of transcription is, and at what times they are activated or shut off. 
              This allows scientists to understand the biology of a cell more deeply and assess changes that may 
              indicate disease. Some of the most popular techniques that use RNA-seq are transcriptional 
              profiling, single nucleotide polymorphism (SNP) identification, RNA editing and differential gene 
              expression analysis.
            </Typography>
            <Stack
              sx={{ pt: 3 }}
              direction="row"
              spacing={5}
              justifyContent="center"
            >
              {!isLoggedin
              ?
              <>
              <Button variant="contained" onClick={(e)=>loginClick(e)}>Login</Button>
              <Button variant="outlined" onClick={(e)=>signupClick(e)}>Signup</Button>
              </>
              :
              <Button variant="contained" onClick={(e)=>dashboardClick(e)}>Dashboard</Button>
              }
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