import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { Corpus } from '../types/UniversityType';
import { Box, Typography } from '@mui/material';

interface CorpusDialogInterface {
    uniName: string | undefined,
    corpuses: Corpus[] | undefined,
    open: boolean,
    handleClose: () => void,
}

export default function CorpusDialog( {uniName, corpuses, open, handleClose }: CorpusDialogInterface ) {

    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle id="alert-dialog-title">
                The corpuses of {uniName}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { corpuses?.length === 0 && "No corpus information is avaliable" }
                </DialogContentText>

                {corpuses?.map(corpus => (
                    <Box key={corpus.id} display={"flex"} gap={2} alignItems={"center"} mb={2}>
                        <Typography> {corpus.name} </Typography>
                        <img src={corpus.imageUrl} alt="corpus img" />
                    </Box>
                ))}

            </DialogContent>
        </Dialog>
    );
}