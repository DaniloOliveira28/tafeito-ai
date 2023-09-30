import { Box, CardActions, CardContent, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

import { url_task } from "../../utils/api";
import { TaskInputProps } from "./TaskInput";

const TaskInput = (props: TaskInputProps) => {
  const { onSelectCreateTask, category } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState<null | string>(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<null | string>(null);

  const { enqueueSnackbar } = useSnackbar();

  const onClick = () => {
    onSelectCreateTask(category.descricao);
    setIsOpen(true);
  };

  const cancelCreateTask = () => {
    onSelectCreateTask(null);
    setTaskDescription(null);
    setIsOpen(false);
  };

  const createTask = async () => {
    const payload = {
      // your post data goes here
      id_categoria: category.id,
      descricao: taskDescription,
    };

    try {
      const response = await axios.post(url_task, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(response.data);
      setError(null);
      setTaskDescription(null);
      onSelectCreateTask(null);
      setIsOpen(false);
      enqueueSnackbar("Tarefa criada!", { variant: "success" });
    } catch (err) {
      setResponse(null);
      setError((err as Error).message);
      enqueueSnackbar("Erro ao criar a tarefa.", { variant: "error" });
    }
  };

  return (
    <Box>
      {isOpen === false ? (
        <Box>
          <Button
            component="label"
            variant="contained"
            onClick={onClick}
            startIcon={<CloudUploadIcon />}
          >
            Adicionar Tarefa
          </Button>
        </Box>
      ) : (
        <Box>
          <Card>
            <CardContent>
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                value={taskDescription}
                onChange={(event) => setTaskDescription(event.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                component="label"
                variant="contained"
                onClick={cancelCreateTask}
              >
                Cancelar
              </Button>
              <Button
                component="label"
                variant="contained"
                onClick={createTask}
              >
                Criar
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default TaskInput;
