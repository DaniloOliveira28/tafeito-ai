import { Box, CardActions, CardContent, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";

import { api } from '../../provider/customAxios';
import { url_tasks, url_update_task } from "../../utils/api";
import { TaskInputProps } from "./TaskInput";
import { useGlobalContext } from "../../utils/global";

const TaskInput = (props: TaskInputProps) => {
  const { category, task, cancelTask, submitTask } = props;

  const isEdit = task !== undefined;

  const { refetchtaskStatus, setSelectedTaskInput, setRefectchTaskStatus } =
    useGlobalContext();

  const [taskDescription, setTaskDescription] = useState<string>(task?.descricao ?? '');
  const [error, setError] = useState<null | string>(null);

  const { enqueueSnackbar } = useSnackbar();

  const cancelCreateTask = () => {
    setSelectedTaskInput(null);
    setTaskDescription("");
    cancelTask();
  };

  const createTask = async () => {
    const payload = {
      // your post data goes here
      id_categoria: category.id,
      descricao: taskDescription,
    };

    try {
      await api.post(url_tasks, payload);
      setError(null);
      setTaskDescription("");
      setSelectedTaskInput(null);
      submitTask();
      enqueueSnackbar("Tarefa criada!", { variant: "success" });
      setRefectchTaskStatus(refetchtaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao criar a tarefa.", { variant: "error" });
    }
  };

  const editTask = async () => {
    const payload = {
      id: task?.id,
      // your post data goes here
      descricao: taskDescription,
    };
    const taskId = task?.id ?? -1;
    const custom_task_url = url_update_task.replace(':id', taskId.toString());
    try {
      await api.patch(custom_task_url, payload);
      setError(null);
      setTaskDescription("");
      setSelectedTaskInput(null);
      submitTask();
      enqueueSnackbar("Tarefa atualizada!", { variant: "success" });
      setRefectchTaskStatus(refetchtaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao criar a tarefa.", { variant: "error" });
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            id="standard-basic"
            label="Qual é a sua tarefa?"
            variant="standard"
            size="small"
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
          />
        </CardContent>
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            // 👇 Edit padding to further adjust position
            p: 2,
          }}
        >
          <Button
            component="label"
            variant="contained"
            onClick={cancelCreateTask}
          >
            Cancelar
          </Button>
          <Button component="label" variant="contained" onClick={isEdit ? editTask: createTask}>
            {isEdit ?  'Editar': 'Criar'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};




export default TaskInput;
