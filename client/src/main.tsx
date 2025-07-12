import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/index.css';
import LeftMenu from './components/LeftMenu';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UniversitiesPage from './pages/UniversitiesPage';
import HighSchoolsPage from './pages/HighSchoolsPage';
import SchoolsPage from './pages/SchoolsPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LeftMenu />}>
                        <Route index element={<HomePage />} />
                        <Route path="/universities/" element={<UniversitiesPage />} />
                        <Route path='/highSchools/' element={<HighSchoolsPage />} />
                        <Route path='/schools/' element={<SchoolsPage />} />
                    </Route>
                    <Route path='/login/' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
