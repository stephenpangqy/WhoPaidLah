import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Box,
    Stack,
    Typography,
    TextField,
    Grid,


} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function AssignItems() {
    const [items, setItems] = useState(
        [
            {name: 'item1', quantity: '1', price: '2.80', assignees: []}, 
            {name: 'item2', quantity: '2', price: '$9.50', assignees: []}, 
            {name: 'item3', quantity: '1', price: '5.80', assignees: []}
        ]
    );
    const [names, setNames] = useState(['Sarah', 'Lina'])

    const handleDragAndDrop = (results) => {
        console.log("handleDragDrop called")
        const {source, destination, type} = results;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (type === 'group') {
            const reorderedItems = [...items];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [removedItem] = reorderedItems.splice(sourceIndex, 1)
            reorderedItems.splice(destinationIndex, 0, removedItem)
            console.log(reorderedItems);
            return setItems(reorderedItems);
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        // Changing Droppable
        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const itemSourceIndex = items.findIndex(
        (item) => item.name === source.droppableId
        );
        const itemDestinationIndex = items.findIndex(
        (item) => item.name === destination.droppableId
        );

        const newSourceNames = [...items[itemSourceIndex].assignees];
        const newDestinationNames =
        source.droppableId !== destination.droppableId
            ? [...items[itemDestinationIndex].assignees]
            : newSourceNames;

        const [deletedName] = newSourceNames.splice(sourceIndex, 1);
        newDestinationNames.splice(destinationIndex, 0, deletedName);

        const newItems = [...items];

        newItems[itemSourceIndex] = {
        ...items[itemSourceIndex],
        assignees: newSourceNames,
        };
        newItems[itemDestinationIndex] = {
        ...items[itemDestinationIndex],
        assignees: newDestinationNames,
        };

        setItems(newItems);
    };


    return (
        <DragDropContext 
            onDragEnd={handleDragAndDrop}
        >
            <Grid item xs={6}>
                <Droppable droppableId="itemList" type="group">
                        {(provided) => (
                            <div className="itemList" {...provided.droppableProps} ref={provided.innerRef}>
                                {items.map((item, index) => (
                                    <Draggable draggableId={item.name} key={item.name} index={index}>
                                        {(provided) => (
                                            <div key={item.name} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                {/* {item.name} ({item.quantity}, ${item.price}) */}
                                                <ItemAssignList itemName={item.name} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            </Grid>
            </DragDropContext>
    );

    function ItemAssignList(itemName, names, id) {
        return (
            <Droppable droppableId={id}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="item-container">
                            <h3>{itemName}</h3>
                        </div>
                        <div className="names-container">
                            {names.map((name, index) => (
                            <Draggable draggableId={name} index={index} key={name}>
                                {(provided) => (
                                <div
                                    className="name-container"
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                >
                                    <h4>{name}</h4>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
                </Droppable>
            );
    }
}

export default AssignItems;