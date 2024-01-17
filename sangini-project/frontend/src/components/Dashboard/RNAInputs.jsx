import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Title from '../Title/Title';
import Button from '@mui/material/Button';

function RNAInputs({rnaNameValue, onChangeRnaName, rnaSequenceValue, onChangeRnaSequence, onPredictedStructureClick}) {
    
    const handleInputChangeRNAName = (value) => {
        onChangeRnaName(value);
    };

    // ----- RNA SEQUENCE STRING ENTRY ------
    const [rnaSequenceErrorMessage, setRnaSequenceErrorMessage] = useState('');

    const handleInputChangeRNASequence = (value) => {
        const newValue = value;
        const validChars = /^[UGAC]*$/;

        if (validChars.test(newValue)) {
            // setRnaSequence(newValue);
            onChangeRnaSequence(newValue);
            setRnaSequenceErrorMessage('')
        } else {
            setRnaSequenceErrorMessage('Valid inputs allowed are UGAC only.')
        }
    };

    // ---- when the button is clicked it triggers the useEffect to fetch relevant data
    const getPredictedStructure = (value) => {
        onPredictedStructureClick(rnaSequenceValue)
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
                    error={!rnaNameValue} // Display error indicator if empty
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
                    inputProps={{ maxLength: 1000 }}
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