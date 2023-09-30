
type TaskCategory = 'trabalho'|'pessoal';

export type TaskInputProps = {
    onSelectCreateTask: (category:TaskCategory|null) => void;
    category: TaskCategory;
}