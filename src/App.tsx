import React, { ReactNode, useState } from "react";
import "./App.css";
import AuthProvider from "./provider/authProvider";
import { SnackbarProvider } from "notistack";
import { MyGlobalContext } from "./utils/global";
import Routes from "./routes";
import { useStateWithRef } from "./utils/hooks";

function App() {
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [selectedTaskInput, setSelectedTaskInput] = useState<string | null>(
    null
  );
  const [refetchtaskStatus, setRefectchTaskStatus] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [softDeletedTasks, setSoftDeletedTasks, softDeletedTasksRef] =
    useStateWithRef([]);

  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <MyGlobalContext.Provider
            value={{
              isEditingTask,
              setIsEditingTask,
              selectedTaskInput,
              setSelectedTaskInput,
              refetchtaskStatus,
              setRefectchTaskStatus,
              isLoading,
              setIsLoading,
              softDeletedTasks,
              setSoftDeletedTasks,
              softDeletedTasksRef,
            }}
          >
            <Routes />
          </MyGlobalContext.Provider>
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
