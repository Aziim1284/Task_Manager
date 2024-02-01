import React, { useState } from "react";
import Tasks from "./Tasks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { editCardName, deleteCard } from "../redux/todoSlice";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import Swal from "sweetalert2";

const Card = ({ title, todoList, groupId }) => {
  const [modal, setModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useDispatch();
  // const titleHandleChange = (e)=>{
  //   const { name, value } = e.target;
  //   setLosetNewTitleginData((prevData) => ({ ...prevData, [name]: value }));
  //   setError((prevError) => ({ ...prevError, [name]: '' }));
  // }
  const changeCardTitle = () => {
    if(!newTitle){
      Swal.fire({
        icon:"error",
        text:"Title Name cannot be empty",
        timer:2000
      })
    }else{
      dispatch(editCardName({ cardId: groupId, title: newTitle }));
      setModal(false);
    }
  };

  const deletehandler = ()=>{
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      dispatch(deleteCard({ cardId: groupId }))
      Swal.fire({
        icon: "success",
        text: "Card deletion Success.",
        timer: 2000,
      });
    }else{
      Swal.fire({
        icon: "info",
        text: "Card deletion canceled.",
        timer: 2000,
      });
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#fff6f661",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" className="font-medium">
          {title}
        </Typography>
        <Box className="space-x-4" sx={{ gap: "20px" }}>
          <IconButton
            title="Edit card title"
            onClick={() => setModal(true)}
            className="text-green-500"
          >
            <EditIcon  style={{ color: "#4caf50", cursor: "pointer" }}/>
          </IconButton>
          <IconButton
            onClick={deletehandler}
            className="text-red-500"
            title="Delete Card"
          >
            <AutoDeleteIcon  style={{ color: "#f44336", cursor: "pointer" }} />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={modal} onClose={() => setModal(false)}>
        <DialogTitle>Enter new Card title here:</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newTitle}
            placeholder="New Card title"
            variant="outlined"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
            changeCardTitle()
            setModal(false)
          }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Tasks todoList={todoList} />
    </Paper>
  );
};

export default Card;
