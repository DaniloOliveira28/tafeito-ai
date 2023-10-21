import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { url_project_task, url_tasks } from "../../utils/api";
import { api } from '../../provider/customAxios';

import { ProjectTasksProps } from "./ProjectTasks";
import { useGlobalContext } from "../../utils/global";
import { Categoria } from "../../utils/model";

const ProjectTasks = (props: ProjectTasksProps) => {
  const { categories } = props;
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<null | number>(null);
  const [projectText, setProjectText] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const { isLoading, setIsLoading, setRefectchTaskStatus, refetchtaskStatus } = useGlobalContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if (selectedCat !== null && projectText !== "") {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [selectedCat, projectText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCat(parseInt((event.target as HTMLInputElement).value));
  };

  const createTask = async (catId:number, taskDecription:string) => {
    const payload = {
      // your post data goes here
      id_categoria: catId,
      descricao: taskDecription,
    };

    await api.post(url_tasks, payload);
  };

  const createProjectTasks = async () => {
    const currentCategory = categories.filter((cat) => cat.id === selectedCat).shift() as Categoria;
 
    setIsLoading(true);
    const payload = {
      // your post data goes here
      descricao: `Categoria do projeto: ${currentCategory?.descricao}
      Projeto: ${projectText}
      `,
    };
    try {
      const res = await api.post(url_project_task, payload);
      await Promise.all(
        res.data?.map((taskSuggestion:string) => createTask(currentCategory.id, taskSuggestion))
      )
      setIsLoading(false);
      enqueueSnackbar("Tarefas criadas!", { variant: "success" });
      setRefectchTaskStatus(refetchtaskStatus + 1);
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar("Erro ao criar as tarefas.", { variant: "error" });

    }
    setSelectedCat(-1);
    setProjectText("");
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Criar Projeto Inteligente
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Projeto TafeitoGPT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Descreva o seu objetivo e então o TafeitoGPT irá criar as tarefas
            necessárias para você alcançar ele.
          </DialogContentText>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Categoria
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedCat}
              onChange={handleChange}
            >
              {categories.map((cat) => {
                return (
                  <Box key={cat.id}>
                    <FormControlLabel
                      value={cat.id}
                      control={<Radio />}
                      label={cat.descricao}
                    />
                  </Box>
                );
              })}
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descrição do projeto"
            multiline
            fullWidth
            variant="standard"
            value={projectText}
            onChange={(e) => {
              setProjectText(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={createProjectTasks} disabled={isValidForm === false || isLoading === true}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectTasks;
