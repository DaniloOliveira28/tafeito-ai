import { Box, Chip, IconButton, Tooltip, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { api } from "../../provider/customAxios";

import { TaskTagsProps } from "./TaskTags";
import { url_add_task_tag } from "../../utils/api";
import { useGlobalContext } from "../../utils/global";

const TaskTags = (props: TaskTagsProps) => {
  const { task } = props;
  const [isAdding, setIsAdding] = useState(false);

  const { setRefectchTaskStatus, refetchtaskStatus } = useGlobalContext();

  const renderAddButton = () => {
    return (
      <Tooltip title="Adicionar etiqueta">
        <IconButton
          edge="end"
          aria-label="adicionar etiqueta"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const addTaskTag = async (tag: string) => {
    const taskId = task?.id ?? -1;
    const custom_task_tag_url = url_add_task_tag
      .replace(":id", taskId.toString())
      .replace(":tag", tag);
    try {
      await api.post(custom_task_tag_url);
      setRefectchTaskStatus(refetchtaskStatus + 1);
    } catch (err) {
      console.error("erro ao adicionar tag");
    }
    setIsAdding(false);
  };

  const removeTaskTag = async (tag: string) => {
    const taskId = task?.id ?? -1;
    const custom_task_tag_url = url_add_task_tag
      .replace(":id", taskId.toString())
      .replace(":tag", tag);
    try {
      await api.delete(custom_task_tag_url);
      setRefectchTaskStatus(refetchtaskStatus + 1);
    } catch (err) {
      console.error("erro ao adicionar tag");
    }
    setIsAdding(false);
  };

  const checkKeyPressed = (e: any) => {
    if (e.keyCode == 13) {
      addTaskTag(e.target.value);
    }
    if (e.keyCode == 27) {
      setIsAdding(false);
    }
  };

  const renderTextInput = () => {
    return <Input autoFocus onKeyDown={checkKeyPressed} />;
  };
  return (
    <Box display={"flex"} px={1} pb={2} alignItems={"center"} flexWrap={"wrap"}>
      {task.etiquetas.map((tag) => (
        <Box pr={1} pb={1} key={tag}>
          <Chip
            color="secondary"
            key={tag}
            label={tag}
            size="small"
            onDelete={() => removeTaskTag(tag)}
          />
        </Box>
      ))}
      {isAdding === false ? renderAddButton() : renderTextInput()}
    </Box>
  );
};

export default TaskTags;
