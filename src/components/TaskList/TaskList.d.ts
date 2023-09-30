import { Categoria, Tarefa} from '../../utils/model';


export type TaskListWrapperProps = {
    categoria: Categoria;
    taskStatus: number;
}

export type TaskListProps = {
    tasks: Tarefa[]
    categoria: Categoria;
}