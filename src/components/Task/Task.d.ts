import { Tarefa } from '../../utils/model';

export type TaskProps = {
    task: Tarefa;
    onTaskChange: (taskId:number) => void;
}