import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const navigateWhenKeyPress = ( key, route ) => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault();
        navigate(route);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}