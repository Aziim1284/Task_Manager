import React from "react";
import Card from "./Card";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { shiftTask } from "../redux/todoSlice";
import { Grid } from "@mui/material";

const Cards = ({ stateToMap }) => {
  const dispatch = useDispatch();
  const shiftingTasks = async (res) => {
    if (!res.destination) return;
    dispatch(shiftTask({ res }));
  };

  return (
    <DragDropContext onDragEnd={shiftingTasks}>
      <Grid container spacing={2}>
        {stateToMap?.map((todoCard) => (
          <Grid item key={todoCard?.id} xs={12} sm={6} md={4} lg={3}>
            {console.log("todoid" ,todoCard)}
            <Card
              title={todoCard?.groupName}
              todoList={todoCard}
              groupId={todoCard?.id}
            />
          </Grid>
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Cards;
