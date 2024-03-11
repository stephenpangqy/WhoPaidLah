import { useEffect, useState } from "react";
import {
    Grid
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import '../App.css';

const DATA = [
    {
    id: "1",
    name: "Assigning",
    tint: 1,
    },
    {
    id: "2",
    name: "Braised Fish",
    tint: 2,
    },
    {
    id: "3",
    name: "Chicken Wings",
    tint: 3,
    },
    ];

// Function to create Droppable
function DroppableItem(props) {
    const [assignees, setAssignees] = useState([]);

    useEffect(() => {
        setAssignees(props.item.assignees);
    },[])

    return (
        <Grid item xs={8}>
            <Droppable droppableId={props.item.id} type="group">
                {(provided) => (
                    <div className="food-container" {...provided.droppableProps} ref={provided.innerRef}>
                        {props.item.id}
                        {assignees.map((assignee, index) => (
                            <Draggable draggableId={assignee} key={assignee} index={index}>
                                {(provided) => (
                                    <div className="store-container" {...provided.dragHandleProps}  {...provided.draggableProps} ref={provided.innerRef} >
                                        <h3>{assignee}</h3>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Grid>
    )
}

function AssignItemsTest() {
    const [stores, setStores] = useState(DATA);
    const [stores2, setStores2] = useState([]);

    const [places, setPlaces] = useState([
        {id:'Assign...', assignees: ['Sarah','Lina']},
        {id:'droppable1', assignees: []},
        {id:'droppable2', assignees: []}
    ]); // Represent list of droppables


    const onDragEnd = (results) => {
        console.log("drag drop event occurrd");
        console.log(results);

        const {source, destination, type} = results;

        if (!destination) return; // (Do nothing) if Draggable was not dragged anywhere
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return; // (Do nothing) if Draggable was dragged to same position

        let chosenAssignees;
        // If draggable is within same droppable, assignees are stated accordingly

        if (source.droppableId === destination.droppableId) {
            chosenAssignees = places[source.droppableId]
            // Process for same droppable index change (TO DO)
        }

        // If draggable moved to different droppable, assignees should change for both droppables (TODO)

        // Re-orders elements based on where it was dragged

        const reorderedStores = [...stores];
        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const [removedStore] = reorderedStores.splice(sourceIndex, 1); // Gets the dragged store
        reorderedStores.splice(destinationIndex, 0, removedStore); // Adds the dragged store to the correct order
        
        console.log(reorderedStores);
        return setStores(reorderedStores);
        
    }

    return (
        <div className="layout__wrapper">
            <div className="card">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="header">
                        <h1>Assign the Payees</h1>
                    </div>
                    {places.map((place) => (
                        <DroppableItem item={place} />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}


export default AssignItemsTest;