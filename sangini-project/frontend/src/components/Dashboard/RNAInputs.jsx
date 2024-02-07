import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Title from '../Title/Title';
import Button from '@mui/material/Button';

function RNAInputs({rnaNameValue, onChangeRnaName, rnaSequenceValue, onChangeRnaSequence, onPredictedStructureClick, disabled}) {
    
    const handleInputChangeRNAName = (value) => {
        onChangeRnaName(value);
        setRnaNameErrorMessage("");
    };

    // ----- RNA SEQUENCE STRING ENTRY ------
    const [rnaNameErrorMessage, setRnaNameErrorMessage] = useState('');
    const [rnaSequenceErrorMessage, setRnaSequenceErrorMessage] = useState('');

    const handleInputChangeRNASequence = (value) => {
        const newValue = value;
        const validChars = /^[UGAC]*$/;

        if (validChars.test(newValue)) {
            onChangeRnaSequence(newValue);
            setRnaSequenceErrorMessage('')
        } else {
            setRnaSequenceErrorMessage('Valid inputs allowed are UGAC only.')
        }
    };

    // ---- when the button is clicked it triggers the useEffect to fetch relevant data
    const getPredictedStructure = (e) => {
        //--RNA Name is mandatory
        if (rnaNameValue.length>0 && rnaSequenceValue.length>0){
            onPredictedStructureClick(rnaSequenceValue)            
        } else {
            setRnaNameErrorMessage('The input ins required.')
            setRnaSequenceErrorMessage('Valid inputs allowed are UGAC only.')
        }
    }
    
  return (

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
                    value={rnaNameValue}
                    onChange={(e) => handleInputChangeRNAName(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                    disabled={disabled}
                    error={rnaNameErrorMessage.length > 0 ? true : false} // Display error indicator if empty
                    // helperText={!rnaStringName && 'This field is required'} // Add helper text                
                    />

                    {/* Captures the RNA Sequence String*/}
                    <TextField
                    margin='normal'
                    required
                    fullWidth
                    id="RNASequence"
                    label="Sequence (UGAC)"
                    name="rnaSequence"
                    autoFocus
                    variant="outlined"
                    value={rnaSequenceValue}
                    onChange={(e) => handleInputChangeRNASequence(e.target.value)}
                    error={rnaSequenceErrorMessage.length > 0 ? true : false}
                    inputProps={{ maxLength: 2000 }}
                    multiline
                    rows={3}
                    />

                    <Button 
                        fullWidth
                        variant="contained"
                        id="PredictStructure"
                        name="PredictStructure"
                        onClick={(e)=>getPredictedStructure(e)}
                    >
                        Get Predicted Structure
                    </Button>
                </Paper>

        
      );
  };


export default RNAInputs;