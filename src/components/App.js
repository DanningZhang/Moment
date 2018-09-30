import React from 'react';
import { Header } from './Header';
import { Main } from './Main';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default App;
