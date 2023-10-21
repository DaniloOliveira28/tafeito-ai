export type Categoria = {
  id: number;
  descricao: string;
};



type IdTarefa = number;

export type Tarefa = {
  descricao: string;
  id_categoria: number;
  id: IdTarefa;
  id_usuario: number;
  data_conclusao: string | null;
  etiquetas: string[];
};
