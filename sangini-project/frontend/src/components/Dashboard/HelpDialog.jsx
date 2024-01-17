import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Title from '../Title/Title';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import QuizIcon from '@mui/icons-material/Quiz';

const style = {
    padding: '5px',
    marginBottom: '10px',
};

const styleTypo = {
    padding: '5px',
};

export default function HelpDialog({ open, handleClose }) {
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Title>Modeling Help</Title>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                  
              <Typography variant='subtitle1'><PlaylistAddCheckCircleIcon /> <b>Open</b></Typography>
              <Typography variant='body1'>Use this action to open and select saved reports.</Typography>
                    
              <Divider variant='horizontal' style={style}></Divider>      
                    
              <Typography variant='subtitle1'><SaveIcon /> <b>Save</b></Typography>
              <Typography variant='body1'>Use this action to save your changes as a report.</Typography>
            
              <Divider variant='horizontal' style={style}></Divider>      
                    
              <Typography variant='subtitle1'><QuizIcon /> <b>Test</b></Typography>
              <Typography variant='body1'>Use this action to select few real RNA sequences to test.</Typography>
                    
              <Divider variant='horizontal' style={style}></Divider>      

              <Typography variant='subtitle1'><b>Nussinov & Zuker Model</b></Typography>
              <Typography variant='body1'>Use these buttons to render the RNA codon sequence as visualizing model.</Typography>
                    
              <Divider variant='horizontal' style={style}></Divider>      

              <Typography variant='subtitle1'><b>Nussinov & Zuker Refresh</b></Typography>
              <Typography variant='body1'>Use these buttons to get the updated RNA sequence and secondary structure after model changes.</Typography>

              <Divider variant='horizontal' style={style}></Divider>      

              <Typography variant='subtitle1'><b>How to model?</b></Typography>
              <Typography variant='body1'>After redendering the model, the below actions can be used to change or update the model as per the need.</Typography>
              <Typography variant='subtitle2' style={styleTypo}><b>RIGHT CLICK:</b> on the canvas to add, delete, insert before/after or change NODE.</Typography>
              <Typography variant='subtitle2' style={styleTypo}><b>SHIFT CLICK:</b> on any LINK to remove it.</Typography>
              <Typography variant='subtitle2' style={styleTypo}><b>SHIFT CLICK:</b> on a NODE and DRAG to create new links.</Typography>

            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>    
  );
}