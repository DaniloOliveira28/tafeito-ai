import { Box, Typography } from "@mui/material";
import TaskInput from "../TaskInput";


import { CustomizedSectionBox } from './styles';
import { useState } from "react";

const Main = () => {

const [selectedTaskInput, setSelectedTaskInput] = useState<string|null>(null);

  return (
    <Box display="flex" flexWrap={"wrap"} sx={{
        margin: '8px 16px 24px 16px'
    }}>
        <CustomizedSectionBox>
            <Typography variant="h1"> Suas tarefas </Typography>
        </CustomizedSectionBox>
        <CustomizedSectionBox>
            <Typography variant="h2"> Pessoal </Typography>
            <div>TODO: Listar Tarefas Pessoais</div>
            {selectedTaskInput === null || selectedTaskInput === 'pessoal' ? <TaskInput category='pessoal' onSelectCreateTask={(category) => {setSelectedTaskInput(category)}} /> : null}
        </CustomizedSectionBox>
        <CustomizedSectionBox>
            <Typography variant="h2"> Trabalho </Typography>
            <div>TODO: Listar Tarefas do trabalho</div>
            {selectedTaskInput === null || selectedTaskInput === 'trabalho' ? <TaskInput category='trabalho' onSelectCreateTask={(category) => {setSelectedTaskInput(category)}}/> : null}
        </CustomizedSectionBox>
    </Box>
  );
};

export default Main;
