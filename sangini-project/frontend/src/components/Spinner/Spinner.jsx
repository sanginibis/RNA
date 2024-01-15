import CircularProgress from '@mui/material/CircularProgress'; // Import the icon

export default function Spinner() {
  return (
    <div className="spinner-container">
      <CircularProgress size={50} // Adjust size as needed
                       thickness={4} // Adjust thickness as desired
      />
    </div>
  );
}