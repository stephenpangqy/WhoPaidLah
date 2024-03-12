import { useEffect, useState } from "react";
import {
    Grid
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import '../App.css';

// Function to create Droppable
function DroppableItem(props) {
    let assignees = props.item.assignees;

    useEffect(() => {
        // setAssignees(props.item.assignees);
    },[props.item])

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

    const [places, setPlaces] = useState([
        {id:'Assign...', assignees: ['Sarah','Lina', 'Cheryl']},
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
        let chosenAssigneesTwo;
        // If draggable is within same droppable, assignees are stated accordingly

        if (source.droppableId === destination.droppableId) {
            chosenAssignees = places.find(item => item.id === source.droppableId).assignees;
             // Re-orders elements based on where it was dragged
            const reorderedAssignees = [...chosenAssignees];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            const [removedAssignee] = reorderedAssignees.splice(sourceIndex, 1); // Gets the dragged store
            reorderedAssignees.splice(destinationIndex, 0, removedAssignee); // Adds the dragged store to the correct order     
            
            const setNewAssignees = () => {
                setPlaces(places => 
                    places.map((item) =>
                        item.id === source.droppableId ? { ...item, assignees: reorderedAssignees } : item
                    )
                );
            }
            setNewAssignees();
        }

        // If draggable moved to different droppable, assignees should change for both droppables (TODO)
        else if (source.droppableId !== destination.droppableId) {

            // Remove the assignee from source
            chosenAssignees = places.find(item => item.id === source.droppableId).assignees;
            const reorderedSource = [...chosenAssignees];
            const sourceIndex = source.index;
            const [removedAssignee] = reorderedSource.splice(sourceIndex, 1);

            // Add assignee to the destination
            chosenAssigneesTwo.places.find(item => item.id === destination.droppableId).assignees;
            const reorderedDestination = [...chosenAssigneesTwo];
            const destinationIndex = destination.index;
            reorderedDestination.splice(destinationIndex, 0, removedAssignee);

            const setNewAssignees = () => {
                // TO ADD WHEN IM BACK
            }
        }
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