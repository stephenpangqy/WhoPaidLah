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
    const [items, setItems] = useState([{name: 'item1', quantity: '1', price: '2.80'}, {name: 'item2', quantity: '2', price: '$9.50'}, {name: 'item3', quantity: '1', price: '5.80'}]);

    const handleDragAndDrop = (results) => {
        console.log("handleDragDrop called")
    };

    return (
        <DragDropContext 
            onDragEnd={handleDragAndDrop}
        >
            <Droppable droppableId="itemList" type="group">
                {(provided) => (
                    <div className="itemList" {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable draggableId={item.name} key={item.name} index={index}>
                                {(provided) => (
                                    <div key={item.name} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                        {item.name} ({item.quantity}, ${item.price})
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default AssignItems;