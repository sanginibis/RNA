/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AminoAcids from './AminoAcids';
import SeqChart from './SeqChart';
import ForContainer from '../Fornac/ForContainer'
import FloatingActionButtons from './FloatingActionButtons'

import { nussinovPredictedStructure, zukerPredictedStructure } from '../../api/predictedStructure';
import { getBioInfoData } from '../../api/bioInfoData';

import RNAInputs from './RNAInputs';

export default function Dashboard() {

  // ----- this the TEST dialog list item selected value -------
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState('');  

  // when an item is selected from the "Test RNAs" dialog
  const handleItemSelected = (item) => {
    setSelectedItem(item);
    onChangeRnaName(item.Name);
    onChangeRnaSequence(item.RNASequence);
  };
  
  // getting the RNA Name
  const [rnaName, setRnaName] = useState('');
  const onChangeRnaName = (value) => {
    setRnaName(value);
  }

  // getting the RNA Sequence
  const [rnaSequence, setRnaSequence] = useState('');
  const onChangeRnaSequence = (value) => {
    setRnaSequence(value);
  }

  // executing loading of secondary structures
  const [loadNussinovStructure, setLoadNussinovStructure] = useState(false); // flag to set for loading nussinov
  const [loadZukerStructure, setLoadZukerStructure] = useState(false); // flag set for loading zuker
  const [loadBioInfoData, setLoadBioInfoData] = useState(false); // flag set for loading the bioinfo data

  const [rnaNussinovStructure, setRnaNussinovStructure] = useState(''); // predicted stucture value for nussinov
  const [rnaZukerStructure, setRnaZukerStructure] = useState(''); // predicted structure value for suker
  const [bioInfoData, setBioInfoData] = useState({}); // predicted structure value for suker

  // upon clicking of the button the loading flags are set.
  // as soon as these values are set the individual useEffects are executed
  const onPredictedStructureClick =(value) => {
    setLoadNussinovStructure(true); 
    setLoadZukerStructure(true);
    setLoadBioInfoData(true);
  }

  // ----- for loading the Nussinov predicted structure ------
  useEffect(() => {
      const fetchData = async () => {
          if (loadNussinovStructure) {
              // finally make sure the predicted structure has been set
              setRnaNussinovStructure(await nussinovPredictedStructure(rnaSequence));
          }
          // make sure finally the loading flag is reset to false
          setLoadNussinovStructure(false);
      };
      
      fetchData();

  }, [loadNussinovStructure, rnaSequence]);

  // ----- for loading the Zuker predicted structure ------
  useEffect(() => {
    const fetchData = async () => {
        if (loadZukerStructure) {
            // finally make sure the predicted structure has been set
            setRnaZukerStructure(await zukerPredictedStructure(rnaSequence));
        }
        setLoadZukerStructure(false);
    };
    
    fetchData();

  }, [loadZukerStructure, rnaSequence]);


  // ----- for loading the BioInfo data ------
  useEffect(() => {
    const fetchData = async () => {
        if (loadBioInfoData) {
            // finally make sure the predicted structure has been set
            setBioInfoData(await getBioInfoData(rnaSequence))
        }
        setLoadBioInfoData(false);
    };
    
    fetchData();

  }, [loadBioInfoData, rnaSequence]);  

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
                  <RNAInputs 
                    rnaNameValue={rnaName}
                    rnaSequenceValue={rnaSequence}
                    onChangeRnaName={onChangeRnaName} 
                    onChangeRnaSequence={onChangeRnaSequence} 
                    onPredictedStructureClick={onPredictedStructureClick} 
                  />
                </Grid>
                
                {/* 
                  This draws the RNA sequence as a chart.
                */}
                <Grid item xs={7}>
                    <SeqChart rnaStringName={rnaName} rnaString={rnaSequence} />
                </Grid>

                {/* 
                  This is the main modeling of the RNA sequence
                */}
                <Grid item xs={12}>
                  <ForContainer
                    nussinovStructure={rnaNussinovStructure}
                    zukerStructure={rnaZukerStructure}
                    nussinovLoading={loadNussinovStructure}
                    zukerLoading={loadZukerStructure}
                  />                    
                </Grid>

                
                {/* Amino Acids */}
                <Grid item xs={12}>
                    <AminoAcids bioInfoDataLoading={loadBioInfoData} bioInfoData={bioInfoData}/>
                </Grid>
              </Grid>
          </Container>
      </Box>
  );
}