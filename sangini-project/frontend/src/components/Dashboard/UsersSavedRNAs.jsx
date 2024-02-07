import React from 'react';
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
import { FixedSizeList } from 'react-window';
import { Box, Grid } from '@mui/material';


export default function  UsersSavedRNAs ({open, handleClose, onItemSelected, rnaSequences}) {
  const handleItemClick = (item) => {
    onItemSelected(item);
    handleClose();
  };
  
  const Row = ({ data, index, style }) => {
    return (
      <div>
        <ListItem key={data[index]} style={{cursor: 'pointer'}} onClick={() => handleItemClick(data[index])}>
          <ListItemText
            primary={data[index].rna_name}
          />
        </ListItem>
      </div>
    );
  };

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Title>Saved RNA Sequences</Title>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
          <FixedSizeList
          itemData={rnaSequences}
          itemCount={rnaSequences.length}
          itemSize={46}
          width="100%"
          height={400}>
            {Row}
          </FixedSizeList>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};



// export default function UsersSavedRNAs({ open, handleClose, onItemSelected, rnaSequences }) {
//     const handleItemClick = (item) => {
//         onItemSelected(item);
//         handleClose();
//     };

//     return (
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           <Title>Saved RNA Sequences</Title>
//         </DialogTitle>
//         <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//                 <List>
//                     {rnaSequences.map((rna) => (
//                         <ListItem 
//                           style={{cursor: 'pointer'}}
//                           key={rna.id} 
//                           onClick={() => handleItemClick(rna)}
//                         >
//                         <ListItemText primary={rna.rna_name} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} autoFocus>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>    
//   );
// }