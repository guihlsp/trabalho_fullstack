import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
