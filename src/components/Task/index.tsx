import { Box } from "@mui/material";
import { useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useGlobalContext } from '../../utils/global';

import { TaskProps } from './Task';

const Task = (props:TaskProps) => {
    const {
        task,
        onTaskChange
    } = props;

    const { setIsEditingTask } = useGlobalContext()

    const [checked, setChecked] = useState([0]);
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

    return (
        <ListItem
          key={task.id}
          secondaryAction={
            <Box>
              <IconButton edge="end" aria-label="editar" onClick={() => {
                  onTaskChange(task.id);
                  setIsEditingTask(true);
                }}>
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
}

export default Task;