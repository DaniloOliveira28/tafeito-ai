import { Categoria } from '../../utils/model';

export type TaskInputProps = {
    onSelectCreateTask: (category:string|null) => void;
    category: Categoria;
}