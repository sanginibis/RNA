/* eslint-disable no-undef */
/*
    This component is used for rendering the secondary structure for visualization.
    It takes inputs as the RNA codon sequence (rnaString) and the RNA secondary structure.
*/
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Title from '../Title/Title';
import Box from '@mui/material/Box';
import Spinner from '../Spinner/Spinner';

export default function ForContainer({nussinovStructure, zukerStructure, nussinovLoading, zukerLoading}) {
  
    const data_nussinov = `    
        <button
            style="
                background-color: var(--primary-color);
                border: none;
                color: white;
                padding: 10px 22px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 5px;
            "
            onclick="nussinov_layout();"
            >
            NUSSINOV-MODEL
        </button>

        <button
            style="
                background-color: var(--secondary-color);
                border: none;
                color: white;
                padding: 10px 22px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 5px;
            "

            onclick="
            stuctureValues = container_nussinov.getStructuresDotBracket();
            document.getElementById('RNASequence').value = stuctureValues[0];
            document.getElementById('RNANussinovStructure').value = stuctureValues[1];
            nussinov_layout();
            ">
            Refresh
        </button>
    `;


    const data_zuker = `
        <button
            style="
                background-color: var(--primary-color);
                border: none;
                color: white;
                padding: 10px 22px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 5px;
            "
            onclick="zuker_layout();"
            >
            ZUKER-MODEL
        </button>

        <button
            style="
                background-color: var(--secondary-color);
                border: none;
                color: white;
                padding: 10px 22px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 5px;
            "
            onclick="
                stuctureValues = container_zuker.getStructuresDotBracket();
                document.getElementById('RNASequence').value = stuctureValues[0];
                document.getElementById('RNAZukerStructure').value = stuctureValues[1];
                zuker_layout();"
            >
            Refresh
        </button>
    `;

    return (
        <Box sx={{ flexGrow: 1, paddingTop: '10px' }}>

            <Title>RNA Modeling & Visualisation</Title>

            <Grid container spacing={2}>
                
                <Grid item xs={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ paddingRight: '15px', }}>
                            
                            {nussinovLoading ? <Spinner /> : (
                                <>
                                    <TextField
                                    margin="normal"
                                    fullWidth
                                    id="RNANussinovStructure"
                                    label="RNA Structure (Nussinov)"
                                    name="rnaNussinovStructure"
                                    autoFocus
                                    variant="outlined"
                                    value={nussinovStructure}
                                    multiline
                                    rows={2}
                                    InputProps={{readOnly: true, }}
                                    />
                                    
                                    <div id='rna_ss_nussinov'
                                        style={{ overflow:'auto' }}
                                        dangerouslySetInnerHTML={{ __html: data_nussinov }}
                                    />
                                </>
                            )}

                        </div>
                    </Paper>
                </Grid>
                

                <Grid item xs={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <div style={{paddingRight: '15px'  }}>
                            {zukerLoading ? <Spinner /> : (
                                <>

                                <TextField
                                margin="normal"
                                fullWidth
                                id="RNAZukerStructure"
                                label="RNA Structure (Zuker)"
                                name="rnaZukerStructure"
                                autoFocus
                                variant="outlined"
                                value={zukerStructure}
                                multiline
                                rows={2}
                                InputProps={{readOnly: true, }}    
                                />
                                    
                                <div
                                    id='rna_ss_zuker'
                                    style={{ overflow:'auto' }}
                                    dangerouslySetInnerHTML={{ __html: data_zuker }}
                                />
                            </>
                            )}
                        </div>
                    </Paper>
                </Grid>
            </Grid>

        </Box>

    );
}

