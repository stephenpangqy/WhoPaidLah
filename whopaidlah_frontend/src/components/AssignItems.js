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
import '../App.css'

const initialItems = [
    { id: 'item1', content: 'Item 1' },
    { id: 'item2', content: 'Item 2' },
];

function AssignItems() {
    const [items, setItems] = useState(initialItems);
    const [droppedItems, setDroppedItems] = useState([]);

    const onDragEnd = (result) => {
            if (!result.destination) return;
            console.log(result);
            const draggedItem = items.find((item) => item.id === result.draggableId); // item Object that shifted destination
            console.log(draggedItem);
            const newItems = items.filter((item) => item.id !== result.draggableId); // List of remaining items in source list
            console.log(newItems);
            setItems(newItems);

            setDroppedItems([...droppedItems, draggedItem]);
        };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Droppable droppableId="droppable-1">
            {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                    background: 'lightgrey',
                    padding: 10,
                    width: 200,
                    minHeight: 200,
                }}
                >
                {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: 'none',
                            padding: 10,
                            margin: '0 0 10px 0',
                            background: 'white',
                            ...provided.draggableProps.style,
                        }}
                        >
                        {item.content}
                        </div>
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
                </div>
            )}
            </Droppable>

            <Droppable droppableId="droppable-2">
            {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                    background: 'lightgrey',
                    padding: 10,
                    width: 200,
                    minHeight: 200,
                }}
                >
                {droppedItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: 'none',
                            padding: 10,
                            margin: '0 0 10px 0',
                            background: 'white',
                            ...provided.draggableProps.style,
                        }}
                        >
                        {item.content}
                        </div>
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
                </div>
            )}
            </Droppable>
        </div>
        </DragDropContext>
    );
}

export default AssignItems;