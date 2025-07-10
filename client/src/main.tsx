import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/index.css';
import LeftMenu from './components/LeftMenu';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LeftMenu />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path='/login/' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
