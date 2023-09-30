import axios from "axios";

import { Box } from "@mui/material";
import { useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalContext } from "../../utils/global";
import DeleteTaskDialog from "../DeleteTaskDialog";
import { TaskProps } from "./Task";
import { url_update_task } from "../../utils/api";
import { useSnackbar } from "notistack";

const Task = (props: TaskProps) => {
  const { task, onTaskChange } = props;

  const { setIsEditingTask, setRefectchTaskStatus, refetchtaskStatus } =
    useGlobalContext();
  const [error, setError] = useState<null | string>(null);

  const [openedDialog, setOpenedDialog] = useState(false);
  const [checked, setChecked] = useState([0]);
  const { enqueueSnackbar } = useSnackbar();
  const labelId = `checkbox-list-label-${task.id}`;

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const deleteTask = async () => {
    const taskId = task?.id ?? -1;
    const custom_task_url = url_update_task.replace(":id", taskId.toString());
    try {
      await axios.delete(custom_task_url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      enqueueSnackbar("Tarefa deletada!", { variant: "success" });
      setRefectchTaskStatus(refetchtaskStatus + 1);
    } catch (err) {
      setError((err as Error).message);
      enqueueSnackbar("Erro ao deletar a tarefa.", { variant: "error" });
    }
  };
  return (
    <>
      <ListItem
        key={task.id}
        secondaryAction={
          <Box>
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => {
                onTaskChange(task.id);
                setIsEditingTask(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="deletar"
              onClick={() => {
                if (openedDialog === false) {
                  setOpenedDialog(true);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
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
          <ListItemText id={labelId} primary={task.descricao} />
        </ListItemButton>
      </ListItem>
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
