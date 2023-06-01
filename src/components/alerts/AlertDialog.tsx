import  React , { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { postsApi } from "../../api/postsApi";
import { useAppDispatch } from "../../app/hook";
import { changeAlert } from "../../features/contentSlice";

interface Props {
    post_id: number;
    toggled: boolean
    handleDialog: (isOpen: boolean)=> void
  }

export const AlertDialog: React.FC<Props> = ({toggled,post_id,handleDialog}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const deletePost = async () => {
    console.log("delet" +  post_id)
    await postsApi
      .delMyPost(post_id)
      .then((res) => {
        if (res.status === 200) {
          handleClose()
          dispatch(changeAlert({ message: res.statusText, color: "green" }));
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
  };

  const handleClose = () => {
    setOpen(false);
    handleDialog(false)
  };

  useEffect(()=> {    
    if(toggled) return setOpen(true);
  },[toggled])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Siz haqiqatdan ham postni o'chirishni xoxlaysizmi?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Yo'q</Button>
          <Button onClick={deletePost}>
            Ha
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}