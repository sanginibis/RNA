import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AminoAcids from './AminoAcids';
import SeqChart from './SeqChart';
import ForContainer from '../Fornac/ForContainer'

import FiberNewIcon from '@mui/icons-material/FiberNew'; // new
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle'; // open
import SaveIcon from '@mui/icons-material/Save'; // save
import QuizIcon from '@mui/icons-material/Quiz'; // test
import HelpIcon from '@mui/icons-material/Help'; // help

import { nussinovPredictedStructure, zukerPredictedStructure } from '../../api/predictedStructure';
import { getBioInfoData } from '../../api/bioInfoData';
import { saveBioInfoDataToDB } from '../../api/saveBioInfoDataToDB';

import RNAInputs from './RNAInputs';
import { Avatar, IconButton, Tooltip } from '@mui/material';

// the modal dialogs
import HelpDialog from './HelpDialog';
import TestRNAs from './TestRNAs';
import Spinner from '../Spinner/Spinner';

export default function Dashboard() {

  // state of the menu action taken
  const [menuAction, setMenuAction] = useState('');  


  // ----- this the TEST dialog list item selected value -------
  const [selectedItem, setSelectedItem] = useState('');  

  // when an item is selected from the "Test RNAs" dialog
  const handleItemSelected = (item) => {
    setSelectedItem(item);
    onChangeRnaName(item.Name);
    onChangeRnaSequence(item.RNASequence);
  };

  const [openHelp, setOpenHelp] = React.useState(false);
  const [openTestRNAs, setOpenTestRNAs] = React.useState(false);

  const handleClickOpenHelp = () => {
    setOpenHelp(true);
  };

  const handleCloseHelp = () => {
    setOpenHelp(false);
  };
  
  const handleClickOpenTestRNAs = () => {
    setOpenTestRNAs(true);
  };

  const handleCloseTestRNAs = () => {
    setOpenTestRNAs(false);
  };


  // setting up the menu functions for the dashboard
  const handleClickMenu = (title) => {

    setMenuAction(title.title);
    
    switch(title.title) {

      case 'new':
        onChangeRnaName('');
        onChangeRnaSequence('');    
        break;

      case 'open':
        break;

      case 'save':
        setProcessSaveBioInfoData(true);
        break;

      case 'test':
        handleClickOpenTestRNAs();
        break;

      case 'help':
        handleClickOpenHelp();
        break;

      default:
        break;
    }
  }

  const menuIconButton = (MenuIcon, title) => {
    return (
      <Tooltip title={title} placement='right'>
        <IconButton onClick={(e)=>handleClickMenu({title})}><Avatar>{MenuIcon}</Avatar></IconButton>
      </Tooltip>
    );
  }  

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
  const [processSaveBioInfoData, setProcessSaveBioInfoData] = useState(false); // flag set to save the data to the database

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

  // ----- for saving the BioInfo data ------
  useEffect(() => {
    const saveData = async () => {
        if (processSaveBioInfoData) {
            // finally make sure the predicted structure has been set
            await saveBioInfoDataToDB(rnaName, rnaSequence);
        }
        setProcessSaveBioInfoData(false);
    };
    
    saveData();

  }, [processSaveBioInfoData, rnaName, rnaSequence]);  

  
  return (
    <Box sx={{ flexGrow: 1, paddingTop: '80px' }}>
        <CssBaseline />
          
          <Container maxWidth="xl" sx={{ mt: 1, mb: 1, left:0, width: '100%', }}>
            
          {processSaveBioInfoData ? <Spinner /> :      
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
                    disabled={menuAction==='open' || menuAction==='test' || menuAction==='save' ? true : false}
                  />
                </Grid>
                
                {/* 
                  This draws the RNA sequence as a chart.
                */}
                <Grid item xs={7}>
                    <SeqChart rnaStringName={rnaName} rnaString={rnaSequence} />
                </Grid>

                <Grid item xs={1}>
                  {menuIconButton(<FiberNewIcon />, 'new')} {/*new*/}
                  {menuIconButton(<PlaylistAddCheckCircleIcon />, 'open')} {/*open*/}
                  {menuIconButton(<SaveIcon />, 'save')} {/*save*/}
                  {menuIconButton(<QuizIcon />, 'test')} {/*test*/}
                  {menuIconButton(<HelpIcon  />, 'help')} {/*help*/}      
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
            }
          </Container>
          
          {/*the modal dialogs*/}
          <HelpDialog open={openHelp} handleClose={handleCloseHelp} />
          <TestRNAs open={openTestRNAs} handleClose={handleCloseTestRNAs} onItemSelected={handleItemSelected} />

      </Box>
  )
}