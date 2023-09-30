import React, { ReactNode } from "react";
import "./App.css";
import AuthProvider from "./provider/authProvider";
import { SnackbarProvider } from "notistack";

import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <Routes />
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
