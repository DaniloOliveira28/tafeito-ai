import { Tarefa } from "../../utils/model";

export type DeleteTaskDialogProps = {
  task: Tarefa;
  cancelCallback: () => void;
  deleteCallback: () => void;
  openedDialog: boolean;
};
