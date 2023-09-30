import axios from "axios";
import { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskListWrapperProps, TaskListProps } from "./TaskList";

import { Tarefa } from "../../utils/model";

import { url_tasks } from "../../utils/api";
import { Box } from "@mui/material";

import { usePreviousValue } from "../../utils/hooks";

const TaskList = (props: TaskListProps) => {
  const { tasks } = props;

  const [checked, setChecked] = useState([0]);

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

  const renderTasks = () => {
    return tasks.map((task) => {
      const labelId = `checkbox-list-label-${task.id}`;

      return (
        <ListItem
          key={task.id}
          secondaryAction={
            <Box>
              <IconButton edge="end" aria-label="editar">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="deletar">
                <DeleteIcon />
              </IconButton>
            </Box>
          }
          disablePadding
        >
          <ListItemButton
            role={undefined}
            onClick={handleToggle(task.id)}
            dense
          >
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
      );
    });
  };
  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {renderTasks()}
      </List>
    </Box>
  );
};

const TaskListWrapper = (props: TaskListWrapperProps) => {
  const { categoria, taskStatus } = props;
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const prevTaskStatus = usePreviousValue(taskStatus);

  const fetchtasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url_tasks);
      const category_tasks = response.data.filter(
        (task: Tarefa) => task.id_categoria === categoria.id
      );
      setTasks(category_tasks);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading === false && prevTaskStatus !== taskStatus) {
      console.log(taskStatus);
      fetchtasks();
    }
  }, [taskStatus]);

  useEffect(() => {
    if (loading === false) {
      fetchtasks();
    }
  }, []);

  return <TaskList tasks={tasks} />;
};

export default TaskListWrapper;
