import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './Navbar';
import CustomSpinner from './Spinner'; // Importe o componente do spinner aqui

function Layout() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStartLoading = () => {
      setLoading(true);
    };

    const handleFinishLoading = () => {
      setLoading(false);
    };

    // Adicione os eventos de início e fim de carregamento
    window.addEventListener('beforeunload', handleStartLoading);
    window.addEventListener('load', handleFinishLoading);

    return () => {
      // Remova os eventos ao desmontar o componente
      window.removeEventListener('beforeunload', handleStartLoading);
      window.removeEventListener('load', handleFinishLoading);
    };
  }, []);

  return (
    <>
      <NavbarComponent />
      {loading ? ( // Exibe o spinner durante o carregamento
        <CustomSpinner />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Layout;
