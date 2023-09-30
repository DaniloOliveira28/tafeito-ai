import { Categoria, Tarefa } from '../../utils/model';



export type TaskInputProps = {
    category: Categoria;
    task?: Tarefa;
    cancelTask: () => void;
    submitTask: () => void;
}