import { Box, Typography } from "@mui/material";
import TaskInput from "../TaskInput";

import { CustomizedSectionBox } from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";

import { url_categorias } from "../../utils/api";
import { Categoria } from "../../utils/model";

import { MainProps } from "./Main";

const Main = (props: MainProps) => {
  const { categorias } = props;

  const [selectedTaskInput, setSelectedTaskInput] = useState<string | null>(
    null
  );

  const renderCategoriaSection = (categoria_item: Categoria) => {
    return (
      <CustomizedSectionBox key={categoria_item.id}>
        <Typography variant="h2"> {categoria_item.descricao} </Typography>
        <div>TODO: Listar Tarefas {categoria_item.descricao}</div>
        {selectedTaskInput === null || selectedTaskInput === categoria_item.descricao ? (
          <TaskInput
            category={categoria_item.descricao}
            onSelectCreateTask={(category) => {
              setSelectedTaskInput(category);
            }}
          />
        ) : null}
      </CustomizedSectionBox>
    );
  };

  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      sx={{
        margin: "8px 16px 24px 16px",
      }}
    >
      <CustomizedSectionBox>
        <Typography variant="h1"> Suas tarefas </Typography>
      </CustomizedSectionBox>
      {categorias.map((categoria) => renderCategoriaSection(categoria))}
    </Box>
  );
};

const MainWrapper = () => {
  const [categorias, setCategorias] = useState<null | Categoria[]>(null);

  useEffect(() => {
    axios.get(url_categorias).then((response) => {
      console.log("xxx", response.data);
      setCategorias(response.data);
    });
  }, []);

  if (categorias !== null) {
    return <Main categorias={categorias} />;
  }

  return <div>Loading!!</div>;
};

export default MainWrapper;
