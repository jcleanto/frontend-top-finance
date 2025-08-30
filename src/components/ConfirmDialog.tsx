import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type IConfirmDialogProps = {
  title: string;
  description: string;
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
};

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  title,
  description,
  open,
  handleClose,
  handleConfirm
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" data-testid="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancelar</Button>
        <Button onClick={() => handleConfirm()} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
