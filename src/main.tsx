
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable React strict mode and add error logging
const root = document.getElementById("root");

if (!root) {
  console.error("Failed to find root element");
} else {
  try {
    const rootInstance = createRoot(root);
    rootInstance.render(<App />);
    console.log("App mounted successfully");
  } catch (error) {
    console.error("Failed to mount app:", error);
  }
}
