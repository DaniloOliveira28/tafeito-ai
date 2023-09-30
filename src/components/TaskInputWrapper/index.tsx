import { Box } from "@mui/material";
import { useState } from "react";

import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";

import { TaskInputPropsWrapper } from "./TaskInputWrapper";
import { useGlobalContext } from "../../utils/global";

import TaskInput from '../TaskInput';

const TaskInputWrapper = (props: TaskInputPropsWrapper) => {
    const { category } = props;
  
    const { setSelectedTaskInput } = useGlobalContext();
  
    const [isOpen, setIsOpen] = useState(false);
  
    const onClick = () => {
      setSelectedTaskInput(category.descricao);
      setIsOpen(true);
    };
  
    return (
      <Box>
        {isOpen === false ? (
          <Box>
            <Button
              component="label"
              variant="contained"
              onClick={onClick}
              startIcon={<AddTaskIcon />}
            >
              Adicionar Tarefa
            </Button>
          </Box>
        ) : (
          <TaskInput
            category={category}
            cancelTask={() => {
              setIsOpen(false);
            }}
            submitTask={() => {
              setIsOpen(false);
            }}
          />
        )}
      </Box>
    );
  };

export default TaskInputWrapper;
