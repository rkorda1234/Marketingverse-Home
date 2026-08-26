import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeDeck } from './components/proposal-prime/PrimeDeck';
import { CustomCursor } from './components/CustomCursor';
import { primeGroupProposal } from './data/proposals/prime-group';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <CustomCursor />
    <PrimeDeck proposal={primeGroupProposal} />
  </React.StrictMode>
);
