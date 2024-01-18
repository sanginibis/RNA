import { useNavigate } from 'react-router-dom';

export default function NavigateToHome() {
    const navigateToHome = useNavigate();
    return(
        <>
            {navigateToHome('/')}
        </>
    )
}