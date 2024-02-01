import React, { useState } from "react";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { addTask, deleteTask, editTask } from "../redux/todoSlice";
import { Box, Button, DialogTitle, TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";


const Tasks = ({ todoList }) => {
  const dispatch = useDispatch();
  const data = localStorage.getItem("persistedUser");
  const parseId = JSON.parse(data);
  const uniquUserId = parseId?.id;

  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({
    message: '',
    deadline: '',
    priority: '',
  });
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const data = {
        // userId:uniquUserId,
        cardId: todoList.id,
        message: message,
        deadline: deadline,
        priority: priority,
      };

      const newErrors = {};
      if (!message) {
        newErrors.message = 'Task is required';
      }else if (!deadline) {
        newErrors.deadline = 'Deadline is required';
      }else if (!priority || priority === 'Choose Priority') {
        newErrors.priority = 'Priority is required';
      }else{
        dispatch(addTask(data));
        console.log("dataaaaa", data);
        setMessage("");
        setDeadline("");
        setOpen(false);
        Swal.fire({
          icon: "success",
          text: "Task Added success",
          timer: 2000,
        });
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error,
        timer: 2000,
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      dispatch(deleteTask({ cardId: todoList?.id, id: taskId }));
      Swal.fire({
        icon: "success",
        text: "Task deletion Success.",
        timer: 2000,
      });
    }else{
      Swal.fire({
        icon: "info",
        text: "Task deletion canceled.",
        timer: 2000,
      });
    }
  };

  const handleEditTask = async (
    taskId,
    newMessage,
    editPriority,
    editDeadline
  ) => {
    if(!newMessage || !editDeadline || !editPriority){
      Swal.fire({
        icon:"error",
        text:"Field cannot be empty",
        timer:2000
      })
    }else{
      dispatch(
        editTask({
          cardId: todoList?.id,
          id: taskId,
          newMessage,
          editPriority,
          editDeadline,
        })
      );
      setOpenModel(false);
      Swal.fire({
        icon:"success",
        text:"Data updated Success",
        timer:2000
      })
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Droppable droppableId={todoList?.id?.toString()}>
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {todoList?.tasks?.map(
              ({ id, title, date, deadline, priority }, index) => {
                return (
                  <Draggable
                    key={id}
                    index={index}
                    val={index}
                    draggableId={id.toString()}
                  >
                    {(provided) => (
                      <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {console.log("Taskidddd", id)}
                        <Task
                          handleDeleteTask={handleDeleteTask}
                          handleEditTask={handleEditTask}
                          taskId={id}
                          taskTitle={title}
                          taskDate={date}
                          openModel={openModel}
                          setOpenModel={setOpenModel}
                          deadline={deadline}
                          priority={priority}
                        />
                      </Box>
                    )}
                  </Draggable>
                );
              }
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {/* dialog box */}

      <Dialog open={open} onClose={handleClose} sx={{ margin: 1 }}>
        <DialogTitle textAlign="center">Add task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="addTask"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a Task"
            style={{ borderRadius: "0.25rem" }}
            error={Boolean(errors.message)}
            helperText={errors.message}
            required
          />
          <TextField
            fullWidth
            id="addTask"
            value={deadline}
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Add a Task"
            style={{ borderRadius: "0.25rem", marginTop: "5px" }}
            error={Boolean(errors.deadline)}
            helperText={errors.deadline}
            required
          />
          <Box sx={{ minWidth: 120, marginTop: "5px" }}>
            <FormControl fullWidth error={Boolean(errors.priority)}>
              <InputLabel id="demo-simple-select-label">
                Choose Priority
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select-label"
                placeholder="Choose Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <MenuItem disabled>Choose Priority</MenuItem>
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
            sx={{
              border: "none",
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
            onClick={(e) => {
              handleAddTask(e);
            }}
          >
            Submit data
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "green",
          color: "white",
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        Add Task
      </Button>
    </div>
  );
};

export default Tasks;
