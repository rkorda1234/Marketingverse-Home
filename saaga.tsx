import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProposalDeck } from './components/proposal/ProposalDeck';
import { CustomCursor } from './components/CustomCursor';
import { saagaProposal } from './data/proposals/saaga';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <CustomCursor />
    <ProposalDeck proposal={saagaProposal} />
  </React.StrictMode>
);
