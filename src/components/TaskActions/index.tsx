import { Box, Tooltip, IconButton } from "@mui/material";
import {
  Delete as DeleteIcon,
  HourglassBottom as HourglassBottomIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import { TaskActionsProps } from "./TaskActions";
import { useGlobalContext } from "../../utils/global";

const TaskActions = (props: TaskActionsProps) => {
  const { deleteTask, editTask, estimateTask } = props;

  const { isLoading } = useGlobalContext();

  return (
    <Box>
      <Tooltip title="Estimar Tarefa">
        <IconButton disabled={isLoading} edge="end" aria-label="editar" onClick={estimateTask}>
          <HourglassBottomIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar Tarefa">
        <IconButton disabled={isLoading} edge="end" aria-label="editar" onClick={editTask}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar Tarefa">
        <IconButton disabled={isLoading} edge="end" aria-label="deletar" onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TaskActions;
