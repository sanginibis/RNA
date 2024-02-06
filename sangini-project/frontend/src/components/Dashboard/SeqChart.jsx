/*
    This component is used for rendering the sequence as a visualization.
    It takes inputs as the name of the RNA string and RNA codon sequence (rnaString).
*/

import { useRef } from "react";
import { Circular, Linear, SeqViz } from "seqviz";
import Paper from '@mui/material/Paper';
import Title from '../Title/Title';


function SeqChart({ rnaStringName, rnaString }) {
  const circular = useRef();
  const linearRef = useRef();

  return (
    <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 299,
    }}
    >
      <Title>Sequence Chart</Title>

      <SeqViz
        name={rnaStringName}
        seq={rnaString}
        annotations={[{ name: "promoter", start: 0, end: 34, direction: 1, color: "blue" }]}
        bpColors={{ A: "#dbdb8d", C: "#98df8a", G: "#ff9896", U: "#aec7e8" }}
        refs={{ circular, linearRef }}
        style={{outerWidth:'100px'}}
      >
        
        {({ circularProps, linearProps, ...props }) => (
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div ref={circular} style={{ height: "100%", width: "50%"}}>
              <Circular {...circularProps} {...props} />
            </div>
            <div ref={linearRef} style={{ height: "100%", width: "100%" }}>
              <Linear {...linearProps} {...props} />
            </div>
          </div>
        )}
        
      </SeqViz>    
    </Paper>

  );
}


export default SeqChart;


        