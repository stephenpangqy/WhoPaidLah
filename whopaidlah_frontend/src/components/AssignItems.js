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

    return (
        <DragDropContext 
            onDragEnd={() => {
                console.log("drag drop event occurred");
            }}
        >
            <Droppable droppableId="itemList">
                {(provided) => (
                    <div className="itemList" {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item) => (
                            <div key={item.name}>
                                {item.name} ({item.quantity}, ${item.price})
                            </div>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default AssignItems;