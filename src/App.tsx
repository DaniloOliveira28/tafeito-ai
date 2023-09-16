import React, { ReactNode }  from 'react';
import './App.css';

function App(props:{children:ReactNode}) {

  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default App;
