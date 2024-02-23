import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


// const cards = [1, 2, 3];


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
            <br/>

            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              RNA sequencing is a technique that can examine the quantity and sequences of RNA in a sample using 
              next-generation sequencing (NGS).
            </Typography>
            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              Next-generation sequencing (NGS) is technology used for DNA and RNA sequencing and 
              variant/mutation detection. NGS can sequence hundreds and thousands of genes or whole genome in a 
              short period of time. The sequence variants/mutations detected by NGS have been widely used for 
              disease diagnosis, prognosis, therapeutic decision, and follow up of patients. The capacity of its 
              massive parallel sequencing offers new opportunities for personalised precision medicine.
            </Typography>
            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              RNA sequencing lets us investigate and discover the transcriptome, the total cellular content of 
              types of RNAs: mRNA, rRNA and tRNA. Understanding the transcriptome is key to connect the 
              information in our genome with its functional protein. It can tell us which genes are turned on 
              in a cell, what their level of transcription is, and at what times they are activated or shut off. 
              This allows scientists to understand the biology of a cell more deeply and assess changes that may 
              indicate disease. Some of the most popular techniques that use RNA sequencing are transcriptional 
              profiling, single nucleotide polymorphism (SNP) identification, RNA editing and differential gene 
              expression analysis.
            </Typography>
            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              Single nucleotide polymorphism, or SNP. A SNP is a one-letter place where your genome varies from 
              another genome sequence. Due to the Human Genome Project, we have found that these single letter 
              changes in our genetic code are placed all across our genomes. We can see that the patterns vary 
              between people and also between populations. If we want to identify genetic contributors to common 
              complex diseases, we can group together thousands of people who have diabetes and compare their SNP 
              patterns to thousands of people who do not have diabetes. 
            </Typography>
            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              This particular website makes use of predicting A 2D structure, describing the structure in terms of base 
              pairs. A 2D structure can describe secondary as well as tertiary structural motifs, such as kissing loops 
              and pseudoknots, at the base pairing level. Such a thermodynamics-based 2D to 3D approach, to some extend, 
              bears resemblance the kinetic hierarchical pathway in RNA folding.
            </Typography>
            <Typography variant="h6" align="left" color="text.primary" paragraph>
              Algorithms here: 
            </Typography>
            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              The Nussinov algorithm is an RNA secondary structure (folding) prediction method using a dynamic programming 
              approach. Ruth Nussinov introduced this algorithm in the year 1978. It involves computing a two-dimensional 
              (2D) diagonal matrix with the same sequence at both dimensions. 
            </Typography>
            <Typography variant="h6" align="left" color="text.secondary" paragraph>
              The Zuker algorithm predicts the most stable secondary structure for a single RNA sequence by computing its 
              minimal free energy (MFE). It uses a "nearest neighbor" model and empirical estimates of thermodynamic 
              parameters for neighboring interactions and loop entropies to score all possible structures. 
              The MFE structure of an RNA sequence is the secondary structure that contributes a minimum of free energy. 
              This structure is predicted using a loop-based energy model and the dynamic programming algorithm introduced 
              by Zuker et al.
            </Typography>
          </Container>
        </Box>
      </main>
    </>
  );
}