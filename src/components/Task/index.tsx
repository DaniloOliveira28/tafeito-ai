import { useState } from "react";
import { format, parseISO } from "date-fns";

import TaskTags from "../TaskTags";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import TaskActions from "../TaskActions";
import { closeSnackbar } from 'notistack'

import { useGlobalContext } from "../../utils/global";
import DeleteTaskDialog from "../DeleteTaskDialog";
import { TaskProps } from "./Task";
import {
  url_update_task,
  url_finish_task,
  url_reopen_task,
  url_estimate_task,
} from "../../utils/api";
import { useSnackbar, SnackbarKey } from "notistack";
import { api } from "../../provider/customAxios";

const Task = (props: TaskProps) => {
  const { task, onTaskChange } = props;

  const {
    setIsEditingTask,
    setRefectchTaskStatus,
    refetchtaskStatus,
    setIsLoading,
    softDeletedTasks,
    setSoftDeletedTasks,
    softDeletedTasksRef
  } = useGlobalContext();
  const [_error, setError] = useState<null | string>(null);

  const [openedDialog, setOpenedDialog] = useState(false);
  const [checked, setChecked] = useState(task.data_conclusao ? [task.id] : [0]);

  const { enqueueSnackbar } = useSnackbar();
  const labelId = `checkbox-list-label-${task.id}`;

  const finishTask = async () => {
    setIsLoading(true);
    const taskId = task?.id ?? -1;
    const custom_task_url = url_finish_task.replace(":id", taskId.toString());
    try {
      await api.post(custom_task_url);
      setError(null);
      enqueueSnackbar("Tarefa concluída!", { variant: "success" });
      setRefectchTaskStatus(refetchtaskStatus + 1);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao tentar concluir a tarefa.", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const reopenTask = async () => {
    setIsLoading(true);
    const taskId = task?.id ?? -1;
    const custom_task_url = url_reopen_task.replace(":id", taskId.toString());
    try {
      await api.post(custom_task_url);
      setError(null);
      enqueueSnackbar("Tarefa reaberta!", { variant: "success" });
      setRefectchTaskStatus(refetchtaskStatus + 1);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao tentar reabrir a tarefa.", { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      finishTask();
    } else {
      newChecked.splice(currentIndex, 1);
      reopenTask();
    }

    setChecked(newChecked);
  };

  const action = (snackbarId:SnackbarKey) => (
    <>
      <button
        onClick={() => {
          const filteredValues = softDeletedTasks.filter(x => x !== task?.id);
          setSoftDeletedTasks(filteredValues);
          closeSnackbar(snackbarId); 
        }}
      >
        Undo
      </button>
    </>
  );

  const deleteTask = async () => {
    setIsLoading(true);
    const taskId = task?.id ?? -1;
    const custom_task_url = url_update_task.replace(":id", taskId.toString());

    try {
      const newSoftDeletedTasks = softDeletedTasks.concat(task?.id);
      setSoftDeletedTasks(newSoftDeletedTasks);

      setError(null);

      enqueueSnackbar("Tarefa deletada!", {
        variant: "success",
        action: action,
        onExited: async () => {

          if(softDeletedTasksRef?.current?.includes(task?.id)) {
            await api.delete(custom_task_url);
          }
  
          //o id da task está na lista de tarefas deletadas?
          //se sim, deletar task
          //se não, não fazer nada
          setRefectchTaskStatus(refetchtaskStatus + 1);
        },
      });

      setRefectchTaskStatus(refetchtaskStatus + 1);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao deletar a tarefa.", { variant: "error" });
      setIsLoading(false);
    }
  };

  const estimateTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = url_estimate_task.replace(":id", taskId.toString());
    setIsLoading(true);
    try {
      const res = await api.post(custom_task_url);
      alert(res.data.estimativa);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const renderFinishedText = () => {
    if (task.data_conclusao) {
      return format(parseISO(task.data_conclusao), "'Concluído em' dd/MM/yyyy");
    }
    return;
  };

  return (
    <>
      <ListItem
        key={task.id}
        secondaryAction={
          <TaskActions
            deleteTask={() => {
              // if (openedDialog === false) {
              //   setOpenedDialog(true);
              // }
              deleteTask()
            }}
            editTask={() => {
              onTaskChange(task.id);
              setIsEditingTask(true);
            }}
            estimateTask={() => {
              estimateTask();
            }}
          />
        }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(task.id) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText
            id={labelId}
            primary={task.descricao}
            secondary={renderFinishedText()}
          />
        </ListItemButton>
      </ListItem>
      <TaskTags task={task} />
      <DeleteTaskDialog
        task={task}
        openedDialog={openedDialog}
        deleteCallback={() => {
          setOpenedDialog(false);
          deleteTask();
        }}
        cancelCallback={() => {
          setOpenedDialog(false);
        }}
      />
    </>
  );
};

export default Task;
