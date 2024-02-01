import React, { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  IconButton,
  Paper,
  Box,
  TextField,
  DialogTitle,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Task = ({
  taskTitle,
  taskId,
  handleDeleteTask,
  handleEditTask,
  deadline,
  priority,
}) => {
  const [editText, setEditText] = useState(taskTitle);
  const [editPriority, setEditpriority] = useState(priority);
  const [editDeadline, setEditDeadline] = useState(deadline);
  const [newTaskId, setNewTaskId] = useState(taskId);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
          marginBottom: "0.5rem",
          borderRadius: "0.25rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "medium", fontSize: "0.875rem" }}
            >
              <span style={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                TaskName:{" "}
              </span>
              {taskTitle}
            </Typography>
            <Typography sx={{ fontWeight: "medium", fontSize: "0.875rem" }}>
              <span style={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                deadline:{" "}
              </span>
              {deadline}
            </Typography>
            <Typography sx={{ fontWeight: "medium", fontSize: "0.875rem" }}>
              <span style={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                Priority:{" "}
              </span>
              {priority}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Button
              onClick={() => {
                setEditText(taskTitle);
                setNewTaskId(taskId);
                setOpen(true);
              }}
            >
              <IconButton title="Edit Task Name">
                <EditNoteIcon style={{ color: "#4caf50", cursor: "pointer" }} />
              </IconButton>
            </Button>

            <Button onClick={() => handleDeleteTask(taskId)}>
              <IconButton title="Delete Task">
                <DeleteForeverIcon
                  title="Delete card"
                  style={{ color: "#f44336", cursor: "pointer" }}
                />
              </IconButton>
            </Button>
          </Box>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose} sx={{ margin: 1 }}>
        <DialogTitle textAlign="center">Edit task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="addTask"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit a Task"
            style={{ borderRadius: "0.25rem" }}
          />
          <TextField
            fullWidth
            id="addTask"
            value={editDeadline}
            type="date"
            onChange={(e) => setEditDeadline(e.target.value)}
            placeholder="Edit a Priority"
            style={{ borderRadius: "0.25rem", marginTop: "5px" }}
          />
          <Box sx={{ minWidth: 120, marginTop: "5px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Priority
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Priority"
                value={editPriority}
                onChange={(e) => setEditpriority(e.target.value)}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleEditTask(newTaskId, editText, editPriority, editDeadline);
              setOpen(false);
            }}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;
