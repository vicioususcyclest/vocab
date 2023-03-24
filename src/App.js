import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRouter from './router/router'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;