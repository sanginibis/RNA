import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import QuizIcon from '@mui/icons-material/Quiz';
import HelpIcon from '@mui/icons-material/Help';

import HelpDialog from './HelpDialog';
import TestRNAs from './TestRNAs';

const style = {
    margin: 0,
    top: '20',
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
    zIndex: 1,
    alignItems: 'center'
};

export default function FloatingActionButtons({ onItemSelected }) {
  const [openHelp, setOpenHelp] = React.useState(false);
  const [openTestRNAs, setOpenTestRNAs] = React.useState(false);

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

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 }, display:'flex' ,flexDirection:'column' }} style={style}>

        <Fab color="secondary" variant="extended" >
          <PlaylistAddCheckCircleIcon sx={{mr: 1, fontSize: '30px' }} />
          Open
        </Fab>

        <Fab color="primary" aria-label="save" variant="extended" >
          <SaveIcon sx={{mr: 1, fontSize: '30px' }} />
          Save
        </Fab>

        <Fab
          variant="extended"
          onClick={handleClickOpenTestRNAs}
        >
          <QuizIcon sx={{ mr: 1, fontSize: '30px'  }} />
          Test
        </Fab>

        <Fab
        variant="extended"
        onClick={handleClickOpenHelp}>
          <HelpIcon sx={{ mr: 1, fontSize: '30px'  }} />
          Help
        </Fab>

      </Box>

      <HelpDialog open={openHelp} handleClose={handleCloseHelp} />
      <TestRNAs open={openTestRNAs} handleClose={handleCloseTestRNAs} onItemSelected={onItemSelected} />

    </>
  );
}