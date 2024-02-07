import React, { useState, useEffect } from 'react';

import {
  CssBaseline,
  Box, 
  Container, 
  Grid, 
  Avatar, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew'; // new
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle'; // open
import SaveIcon from '@mui/icons-material/Save'; // save
import QuizIcon from '@mui/icons-material/Quiz'; // test
import HelpIcon from '@mui/icons-material/Help'; // help

import { saveBioInfoDataToDB } from '../../api/saveBioInfoDataToDB';
import { getRNASequencesAPI } from '../../api/getRNASequencesAPI';

import AminoAcids from './AminoAcids';
import SeqChart from './SeqChart';
import ForContainer from '../Fornac/ForContainer'
import RNAInputs from './RNAInputs';

// the modal dialogs
import HelpDialog from './HelpDialog';
import TestRNAs from './TestRNAs';
import Spinner from '../Spinner/Spinner';
import UsersSavedRNAs from './UsersSavedRNAs';

export default function Dashboard() {

  //-----------------------------------THE RNA INPUT AND LOADING ------------------------------------------
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

  const [processSaveBioInfoData, setProcessSaveBioInfoData] = useState(false); // flag set to save the data to the database
  const [rnaNussinovStructure, setRnaNussinovStructure] = useState(''); // predicted stucture value for nussinov
  const [rnaZukerStructure, setRnaZukerStructure] = useState(''); // predicted structure value for zuker
  const [aminoAcidsData, setAminoAcidsData] = useState({}); // translated codons data as amino acids
  const [bioInfoData, setBioInfoData] = useState({}); // rest of the bio info details data

  const resetData = () => {
    setRnaName('');
    setRnaSequence('');
    setRnaNussinovStructure('');
    setRnaZukerStructure('');
    setAminoAcidsData({});
    setBioInfoData({});
  }

  // upon clicking of the button the loading flags are set.
  // as soon as these values are set the individual useEffects are executed
  const onPredictedStructureClick =(value) => {
    setProcessSaveBioInfoData(true);
  }

  // ----- for saving the BioInfo data ------
  useEffect(() => {
    const saveData = async () => {
        if (processSaveBioInfoData) {
            // finally make sure the predicted structure has been set
            const responseData = await saveBioInfoDataToDB(rnaName, rnaSequence);
            if (responseData) {
              setRnaName(responseData.dataObj.rna_name);
              setRnaSequence(responseData.dataObj.rna_sequence);
              setRnaNussinovStructure(responseData.dataObj.nussinov_structure);
              setRnaZukerStructure(responseData.dataObj.zuker_structure);
              setAminoAcidsData(responseData.dataObj.amino_acids_data);
              setBioInfoData(responseData.dataObj.bio_info_details);
            }
        }
        setProcessSaveBioInfoData(false);
    };
    saveData();
  }, [processSaveBioInfoData, rnaName, rnaSequence]);  

  //-----------------------------------THE MENU ACTIONS ------------------------------------------
  // state of the menu action taken
  // eslint-disable-next-line
  const [menuAction, setMenuAction] = useState('');  

  // setting up the menu functions for the dashboard
  const [disabled, setDisabled] = useState(false);
  const handleClickMenu = (title) => {

    setMenuAction(title.title);
    
    switch(title.title) {

      case 'new':
        resetData();
        setDisabled(false);

        break;

      case 'open':
        handleClickOpenSavedRNASequences();        
        break;

      case 'save':
        if (rnaName && rnaSequence) {
          setProcessSaveBioInfoData(true);
          setDisabled(true);
        }
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

  // ----- for getting the RNA sequences for the logged in user ------
  const [rnaSequences, setRnaSequences] = useState([]);
  const [loadRNASequences, setLoadRNASequences] =  useState(false);
  useEffect(() => {
    const saveData = async () => {
      if(loadRNASequences) {
        const responseData = await getRNASequencesAPI();
        if (responseData) {
          setRnaSequences(responseData);
        }
      }
      setLoadRNASequences(false);
    };
    saveData();
  }, [loadRNASequences]);  

  //-----------------------------------HANDLING HELP AND TEST DATA DIALOGS ---------------------------------
  // ----- this the TEST dialog list item selected value -------
  // eslint-disable-next-line
  const [selectedItem, setSelectedItem] = useState('');  

  // when an item is selected from the "Test RNAs" dialog
  const handleItemSelected = (item) => {
    resetData();
    setSelectedItem(item);
    onChangeRnaName(item.rna_name);
    onChangeRnaSequence(item.rna_sequence);
    setDisabled(true);
  };

  const [openHelp, setOpenHelp] = useState(false);
  const [openTestRNAs, setOpenTestRNAs] = useState(false);
  const [openSavedRNASequences, setOpenSavedRNASequences] = useState(false);

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

  const handleClickOpenSavedRNASequences = () => {
    setLoadRNASequences(true);
    setOpenSavedRNASequences(true);
  };

  const handleClickCloseSavedRNASequences = () => {
    setOpenSavedRNASequences(false);
  };

  //-----------------------------------FINALLY RENDERING THE PAGE ---------------------------------
  return (
    <Box sx={{ flexGrow: 1, paddingTop: '80px' }}>
        <CssBaseline />
          
          <Container maxWidth="xl" sx={{ mt: 1, mb: 1, left:0, width: '100%', }}>
            
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
                    disabled={disabled}
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
                  />                    
                </Grid>

                
                {/* Amino Acids */}
                <Grid item xs={12}>
                    <AminoAcids aminoAcidsData={aminoAcidsData} bioInfoData={bioInfoData}/>
                </Grid>
              </Grid>
            
          </Container>
          
          {/*the modal dialogs*/}
          <HelpDialog open={openHelp} handleClose={handleCloseHelp} />
          <TestRNAs open={openTestRNAs} handleClose={handleCloseTestRNAs} onItemSelected={handleItemSelected} />
          <UsersSavedRNAs open={openSavedRNASequences} handleClose={handleClickCloseSavedRNASequences} onItemSelected={handleItemSelected} rnaSequences={rnaSequences}/>
          {processSaveBioInfoData && <Spinner />}      

      </Box>
  )
}