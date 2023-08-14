import react from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './components/Index';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);