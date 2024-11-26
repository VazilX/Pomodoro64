import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>,
);
