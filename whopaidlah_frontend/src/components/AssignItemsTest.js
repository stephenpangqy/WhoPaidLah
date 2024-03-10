import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import '../App.css';

const DATA = [
    {
    id: "1",
    name: "Assigning",
    items: [
        { id: "1", name: "Stephen" },
        { id: "2", name: "LT" },
    ],
    tint: 1,
    },
    {
    id: "2",
    name: "Braised Fish",
    items: [
        { id: "1", name: "Stephen" },
        { id: "2", name: "LT" },
    ],
    tint: 2,
    },
    {
    id: "3",
    name: "Chicken Wings",
    items: [
        { id: "1", name: "Stephen" },
        { id: "2", name: "LT" },
    ],
    tint: 3,
    },
    ];

function AssignItemsTest() {
    const [stores, setStores] = useState(DATA);

    const handleDragAndDrop = (results) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
        )
        return;

        if (type === "group") {
        const reorderedStores = [...stores];

        const storeSourceIndex = source.index;
        const storeDestinatonIndex = destination.index;

        const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
        reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

        return setStores(reorderedStores);
        }
        const itemSourceIndex = source.index;
        const itemDestinationIndex = destination.index;

        const storeSourceIndex = stores.findIndex(
        (store) => store.id === source.droppableId
        );
        const storeDestinationIndex = stores.findIndex(
        (store) => store.id === destination.droppableId
        );

        const newSourceItems = [...stores[storeSourceIndex].items];
        const newDestinationItems =
        source.droppableId !== destination.droppableId
            ? [...stores[storeDestinationIndex].items]
            : newSourceItems;

        const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
        newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

        const newStores = [...stores];

        newStores[storeSourceIndex] = {
        ...stores[storeSourceIndex],
        items: newSourceItems,
        };
        newStores[storeDestinationIndex] = {
        ...stores[storeDestinationIndex],
        items: newDestinationItems,
        };

        setStores(newStores);
    };

    return (
        <div className="layout__wrapper">
        <div className="card">
            <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className="header">
                <h1>Shopping List</h1>
            </div>
            <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stores.map((store, index) => (
                    <Draggable
                        draggableId={store.id}
                        index={index}
                        key={store.id}
                    >
                        {(provided) => (
                        <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                        >
                            <StoreList {...store} />
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            </DragDropContext>
        </div>
        </div>
    );
    }

    function StoreList({ name, items, id }) {
    return (
        <Droppable droppableId={id}>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="items-container">
                <h3>{name}</h3>
            </div>
            <div className="names-container">
                {items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                    <div
                        className="name-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <h4>{item.name}</h4>
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

export default AssignItemsTest;