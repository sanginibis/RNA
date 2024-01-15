/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AminoAcids from './AminoAcids';
import SeqChart from './SeqChart';
import ForContainer from '../Fornac/ForContainer'
import TextField from '@mui/material/TextField';
import Title from './Title';
import FloatingActionButtons from './FloatingActionButtons'

import { callApi } from '../../api/api';
import { Button } from '@mui/material';

const headers = {
    'Content-Type': 'application/json'
};

export default function Dashboard() {

  // ----- textfield input values that takes the Name of the RNA sequence and the sequence ------
  const [rnaString, setRnaString] = useState('');
  const [rnaStringName, setRnaStringName] = useState('');
  const [rnaStringErrorMessage, setRnaStringErrorMessage] = useState('');


  // ----- textfield that renders the dot btacket structure values ------
  const [rnaNussinovStructure, setRnaNussinovStructure] = useState('');
  const [rnaZukerStructure, setRnaZukerStructure] = useState('');

  // ----- this the TEST dialog list item selected value -------
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState('');  


  // ----- this UseEffect used to get the NUSSINOV structure from the backend node js REST API -------
  // it has been put under useEffect since this API might take time
  const [dataNussinov, setDataNussinov] = useState('');
  const [errorNussinov, setErrorNussinov] = useState('');
  const [loadingNussinov, setLoadingNussinov] = useState(false);

  // ----- for loading the Nussinov predicted structure ------
  useEffect(() => {

    let responseData = "";
    
    const fetchData = async () => {

      try {

        if (loadingNussinov) {
          const apiUrl = "http://localhost:4000/users/dashboard/nussinov"

          const data = { "rna_sequence": rnaString }

          responseData = await callApi(apiUrl, 'POST', data, headers);
          const st = responseData.data.nussinov;
          setDataNussinov(setRnaNussinovStructure(st));
        }

      } catch (error) {
        setErrorNussinov(error);
      } finally {
        setLoadingNussinov(false);
      }
    };

    fetchData();
  }, [loadingNussinov, rnaString]);


  // ----- this UseEffect used to get the NUSSINOV structure from the backend node js REST API -------
  // it has been put under useEffect since this API might take time
  const [dataZuker, setDataZuker] = useState('');
  const [errorZuker, setErrorZuker] = useState('');
  const [loadingZuker, setLoadingZuker] = useState(false);
  
  useEffect(() => {

    let responseData = "";
    
    const fetchData = async () => {

      try {

        if (loadingZuker) {
          const apiUrl = "http://localhost:4000/users/dashboard/zuker"

          const data = { "rna_sequence": rnaString }

          responseData = await callApi(apiUrl, 'POST', data, headers);
          const st = responseData.data.zuker;
          setDataZuker(setRnaZukerStructure(st));
        }

      } catch (error) {
        setErrorZuker(error);
      } finally {
        setLoadingZuker(false);
      }
    };

    fetchData();
  }, [loadingZuker, rnaString]);

  const getPredictedStructure = (value) => {
    setLoadingNussinov(true);
    setLoadingZuker(true);
  }

  const handleInputChangeSequence = (value) => {
    const newValue = value;
    const validChars = /^[UGAC]*$/;

    if (validChars.test(newValue)) {
      setRnaString(newValue);

      setRnaNussinovStructure('');
      // setRnaNussinovStructure(dataNussinov);
      //setRnaZukerStructure(getPredictedStructureZuker(value));

      setRnaStringErrorMessage('');
    } else {
      setRnaStringErrorMessage('Only U G A C are valid entries allowed.');
    }
  };

  const handleInputChangeRNAName = (value) => {
    console.log(value);
      setRnaStringName(value);
  };

  const handleItemSelected = (item) => {
    setSelectedItem(item);
    handleInputChangeSequence(item.RNASequence);
    handleInputChangeRNAName(item.Name);
  };
  

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '80px' }}>
        <CssBaseline />
          <Container maxWidth="xl" sx={{ mt: 1, mb: 1, left:0, width: '100%', }}>
            <FloatingActionButtons onItemSelected={handleItemSelected}/>
            <Grid container spacing={2}>
              {/* 
                This section is to capture the RNA Name and Sequence.
                Based on the details captured it will render the RNA sequence as a codon visualisation on the right.
              */}
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                      <Title>RNA Sequence</Title>

                      {/* Captures the RNA Name*/}
                      <TextField
                      margin='normal'
                      required
                      fullWidth
                      id="RNAName"
                      label="Name"
                      name="rnaName"
                      autoFocus
                      variant="outlined"
                      value={rnaStringName}
                      onChange={(e) => handleInputChangeRNAName(e.target.value)}
                      inputProps={{ maxLength: 100 }}
                      error={!rnaStringName} // Display error indicator if empty
                      // helperText={!rnaStringName && 'This field is required'} // Add helper text                
                      />

                      {/* Captures the RNA Sequence*/}
                      <TextField
                      margin='normal'
                      required
                      fullWidth
                      id="RNASequence"
                      label="Sequence (UGAC)"
                      name="rnaSequence"
                      autoFocus
                      variant="outlined"
                      value={rnaString}
                      onChange={(e) => handleInputChangeSequence(e.target.value)}
                      error={rnaStringErrorMessage.length > 0 ? true : false}
                      inputProps={{ maxLength: 1000 }}
                      multiline
                      rows={3}
                      />

                      <Button onClick={(e)=>getPredictedStructure(e)}>Get Predicted Structure</Button>
                      
                  </Paper>
                </Grid>
                
                {/* 
                  This draws the RNA sequence as a chart.
                */}
                <Grid item xs={8}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 270,
                    }}
                  >
                    <Title>Sequence Chart</Title>
                    <SeqChart rnaStringName={rnaStringName} rnaString={rnaString} />
                  </Paper>
                </Grid>

                {/* 
                  This is the main modeling of the RNA sequence
                */}
                <Grid item xs={12}>
                  <ForContainer
                    nussinovStructure={rnaNussinovStructure}
                    zukerStructure={rnaZukerStructure}
                    nussinovLoading={loadingNussinov}
                    zukerLoading={loadingZuker}
                  />                    
                </Grid>

                
                {/* Amino Acids */}
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <AminoAcids rnaString={rnaString} />
                  </Paper>
                </Grid>
              </Grid>
          </Container>
      </Box>
  );
}