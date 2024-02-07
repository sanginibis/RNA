import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/Title';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Spinner from '../Spinner/Spinner';


// declare the columns for the amino acid table
const columnsCodon = [
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

// declare the columns for the bio info table
const columnsBioInfo = [
  {
    width: 180,
    label: 'Name',
    dataKey: 'name',
  },
  {
    width: 180,
    label: 'Data',
    dataKey: 'data',
  }
];

// declare the table component that will hold the columsn and rows
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


// function that creates the column header contents for codons
function codontableHeaderContent() {
  return (
    <TableRow>
      {columnsCodon.map((column) => (
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

// function that creates the column header contents for bioinfo
function bioInfotableHeaderContent() {
  return (
    <TableRow>
      {columnsBioInfo.map((column) => (
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
function codonTableRowContent(_index, row) {
  return (
    <React.Fragment>
      <TableCell>{row.code}</TableCell>
      <TableCell>{row.codon}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">{row.count}</TableCell>
      <TableCell>{row.positions.join(', ')}</TableCell>
    </React.Fragment>
  );
}

function bioInfoTableRowContent(_index, row) {
  return (
    <React.Fragment>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.data}</TableCell>
    </React.Fragment>
  );
}

export default function AminoAcids({ bioInfoDataLoading, aminoAcidsData, bioInfoData }) {
  
  let rowsCodon = aminoAcidsData;
  let rowsBioInfo = bioInfoData;

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Amino Acids</Title>
          {bioInfoDataLoading ? <Spinner /> : (
            <div style={{ height: 300, width: '100%' }}>
              <TableVirtuoso
                data={rowsCodon}
                components={tableComponents}
                fixedHeaderContent={codontableHeaderContent}
                itemContent={codonTableRowContent}
              />
            </div>
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={4}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Bio Info Data</Title>
          {bioInfoDataLoading ? <Spinner /> : (
            <div style={{ height: 300, width: '100%' }}>
              <TableVirtuoso
                data={rowsBioInfo}
                components={tableComponents}
                fixedHeaderContent={bioInfotableHeaderContent}
                itemContent={bioInfoTableRowContent}
              />
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}