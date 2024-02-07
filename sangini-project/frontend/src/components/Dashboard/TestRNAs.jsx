import React  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Title from '../Title/Title';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { rnaTestSequences } from '../../config/navigation';

export default function TestRNAs({ open, handleClose, onItemSelected }) {
    const handleItemClick = (item) => {
        onItemSelected(item);
        handleClose();
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Title>Test RNA Sequences</Title>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <List>
                    {rnaTestSequences.map((rna) => (
                        <ListItem 
                          style={{cursor: 'pointer'}}
                          key={rna.id} 
                          onClick={() => handleItemClick(rna)}
                        >
                        <ListItemText primary={rna.rna_name} />
                        </ListItem>
                    ))}
                </List>
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