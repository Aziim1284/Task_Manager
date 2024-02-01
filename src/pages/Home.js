import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { newBoardDispatch, addCard } from "../redux/todoSlice";
import {
  Button,
  Input,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
const Home = () => {
  const dispatch = useDispatch();
  const data = localStorage.getItem("persistedUser");
  const parseId = JSON.parse(data);
  const userId = parseId?.id;

  const states = useSelector((card) => card.todo);

  // const checkDataflow = useSelector((board) => {
  //   return board.todo.mainCard.filter((arr) => {
  //     console.log("arrrr", arr);
  //     return arr.id === userId;
  //   });
  // });
  const checkDataflow = useSelector((board)=> board.todo.mainCard);
  // const checkDataflow = useSelector((state) => {
  //   return Array.isArray(state.auth.users) ? state.auth.users : [];
  // });
  const filteredData = checkDataflow.filter((arr)=>{
    console.log('~ in ', arr);
      return arr?.userId === userId
    })

console.log("checkDataflowcheckDataflow" ,filteredData)
  const [stateToMap, setStateToMap] = useState(
    states?.currState === "mainCard" ? states.mainCard : states?.newBoard
  );
  console.log("statetomapstatetomap" , stateToMap)
  const [addCardTitle, setAddCardTitle] = useState("");
  const handleAddCard = () => {
    if (addCardTitle === "") {
      Swal.fire({
        icon:"error",
        text:"Add Card Title",
        timer:2000

      })
    } else {
      dispatch(addCard({ title: addCardTitle}));
      setAddCardTitle("");
    }
  };

  useEffect(() => {
    setStateToMap(
      states?.currState === "mainCard" ? states.mainCard : states?.newBoard
    );
  }, [states]);
console.log("stateToMapstateToMapstateToMap" ,stateToMap)
  return (
    <Container maxWidth="lg" sx={{mt:9}}>
      {/* when user logged in then these card will show  */}
      {filteredData.length > 0 ?
          <Grid  sx={{m:5}} >
          <Grid item xs={12}>
            <Cards stateToMap={filteredData} />
          </Grid>
        </Grid>: null
    }
      
      <>
      <Paper elevation={1}  sx={{p:2 ,my:5 ,width:"30vw", ml:5}} >
        <Typography variant="h6" component="h2">
          Add  Card 
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12}>
            <Input
              value={addCardTitle}
              onChange={(e) => setAddCardTitle(e.target.value)}
              type="text"
              placeholder="Add a new card title"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={handleAddCard}
              variant="outlined"
              className="rounded-md"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      </>

    </Container>
  );
};

export default Home;
