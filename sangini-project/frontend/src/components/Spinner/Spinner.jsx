import BiotechIcon from '@mui/icons-material/Biotech';
import Title from '../Title/Title';

export default function Spinner() {
  return (
    <div className={"loader-wrapper"}>
      <div className={"loader"}>
        <BiotechIcon style={{width: '60px', height: '60px'}} />  
        <Title>Loading...</Title>      
      </div>
    </div>
   );
}