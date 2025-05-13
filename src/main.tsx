
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Telegram-like styles
const style = document.createElement('style');
style.textContent = `
  :root {
    --telegram-blue: #1E94D2;
    --telegram-bg: #F5F5F5;
  }
  
  body {
    background-color: var(--telegram-bg);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .message-bubble {
    background-color: white;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
