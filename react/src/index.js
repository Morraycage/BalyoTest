import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const GlobalContext = createContext({
  apiKey: undefined,
});

function Store({ apiKey, children }) {
  return (
    <GlobalContext.Provider value={{ apiKey }}>
      {children}
    </GlobalContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Store apiKey={process.env.REACT_APP_API_KEY}>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
