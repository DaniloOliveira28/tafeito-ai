import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { DeleteTaskDialogProps } from "./DeleteTaskDialog";

const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {
  const { task, cancelCallback, deleteCallback, openedDialog } = props;

  return (
    <Dialog
      open={openedDialog}
      maxWidth="sm"
      fullWidth
      onClose={cancelCallback}
    >
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>Você tem certeza que quer deletar a tarefa?</Typography>
        <Typography variant="body2">{task.descricao}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={cancelCallback}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={deleteCallback}>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
