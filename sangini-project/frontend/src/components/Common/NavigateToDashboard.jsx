import { useNavigate } from 'react-router-dom';

export default function NavigateToDashboard() {
    const navigateToDashboard = useNavigate();
    navigateToDashboard('/dashboard');
}