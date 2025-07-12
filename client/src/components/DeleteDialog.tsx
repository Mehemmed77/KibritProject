import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

interface DeleteDialogProps {
    open: boolean,
    handleClose: (deleteRow?: boolean) => void,
}

export default function DeleteDialog( { open, handleClose }: DeleteDialogProps ) {

    const deleteRowFromServer = async () => {
        const link = "http://localhost:5000/api/delete/";
        const res = await axios.get(link);
        console.log(res);
    }

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
                <Button onClick={() => {
                    handleClose(true);
                    deleteRowFromServer();
                }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
