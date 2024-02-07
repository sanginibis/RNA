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
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper, TableHead } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

// declare the columns
const columns = [
  {
    width: 180,
    label: 'RNA Name',
    dataKey: 'rna_name',
  },
  {
    width: 180,
    label: 'Sequence',
    dataKey: 'rna_sequence',
  }
];

// declare the table component that will hold the columns and rows
const tableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),  
}

// function that creates the column headers
function tableHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
            fontWeight: 500,
          }}
        >
          <Typography style={{fontSize:'12px', fontWeight: 800}}>{column.label}</Typography>
        </TableCell>
        
      ))}
    </TableRow>
  );
}


export default function  UsersSavedRNAs ({open, handleClose, onItemSelected, rnaSequences}) {
  
  let rows = rnaSequences;

  const handleItemClick = (item) => {
    onItemSelected(item);
    handleClose();
  };

  // function that creates each row content
  function tableRowContent(_index, row) {
    return (
      <React.Fragment>
        <TableCell sx={{cursor:'pointer'}} onClick={(e)=>handleItemClick(row)}>{row.rna_name}</TableCell>
        <TableCell sx={{cursor:'pointer'}} onClick={(e)=>handleItemClick(row)}>{row.rna_sequence}</TableCell>
      </React.Fragment>
    );
  }
  
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
          <Grid item xs={12}>
            <div style={{display: 'flex', flexDirection: 'column', height: 300, width: 500 }}>
                  <TableVirtuoso
                    data={rows}
                    components={tableComponents}
                    fixedHeaderContent={tableHeaderContent}
                    itemContent={tableRowContent}
                  />
            </div>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus >
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