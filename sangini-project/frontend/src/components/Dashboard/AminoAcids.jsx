import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

import { getAminoAcids } from '../../api/api';
import { Typography } from '@mui/material';


// declare the columns for the amino acid table
const columns = [
  {
    width: 60,
    label: 'Code',
    dataKey: 'code',
  },
  {
    width: 180,
    label: 'Codon',
    dataKey: 'codon',
  },
  {
    width: 80,
    label: 'Amino Acid',
    dataKey: 'aminoAcid',
  },
  {
    width: 10,
    label: 'Count',
    dataKey: 'count',
    numeric: true,
  },
  {
    width: 180,
    label: 'Positions',
    dataKey: 'positions',
  },
];


// declare the table component that will hold the columsn and rows
const aminoAcidTableComponents = {
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


// function that creates the column header contents
function aminoAcidHeaderContent() {
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

// function that creates each row content
function aminoAcidRowContent(_index, row) {
  return (
    <React.Fragment>
      <TableCell>{row.code}</TableCell>
      <TableCell>{row.codon}</TableCell>
      <TableCell >{row.name}</TableCell>
      <TableCell align="right">{row.count}</TableCell>
      <TableCell >{row.positions.join(', ')}</TableCell>
    </React.Fragment>
  );
}


export default function AminoAcids({ rnaString }) {
  
  let rows = getAminoAcids(rnaString);

  return (
    <>
      <Title>Amino Acids</Title>
      <Paper style={{ height: 300, width: '100%' }}>
        <TableVirtuoso
          data={rows}
          components={aminoAcidTableComponents}
          fixedHeaderContent={aminoAcidHeaderContent}
          itemContent={aminoAcidRowContent}
        />
      </Paper>
    </>
  );
}