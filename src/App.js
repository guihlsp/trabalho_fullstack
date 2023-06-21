import './App.css';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
