import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteDialogProps {
    open: boolean,
    handleClose: (deleteRow?: boolean) => void,
}

export default function DeleteDialog( { open, handleClose }: DeleteDialogProps ) {
  return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete this?
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Disagree</Button>
                <Button onClick={() => handleClose(true)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
