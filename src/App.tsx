import React, { useEffect } from 'react';
import search from 'src/assets/images/search.svg';

export function App() {
        return (
            <div className="App">
                    <img src={search} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
            </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
            </a>
            </div>
        );
}
