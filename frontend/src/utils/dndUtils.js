
export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const onDragEnd = (result, state, setState, updateTaskParentList) => {
    const { source, destination } = result;
    console.log("LOG INFO: onDragEnd result", result, state);

    if (!destination) {
        return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const sourceTaskId = state[sInd].Tasks[source.index].id;
    const destinationListId = state[dInd].id;
    if (sInd === dInd) {
        const items = reorder(state[sInd].Tasks, source.index, destination.index);
        const newState = [...state];
        newState[sInd].Tasks = items;
        setState(newState);
    } else {
        const result = move(state[sInd].Tasks, state[dInd].Tasks, source, destination);
        const newState = [...state];
        newState[sInd].Tasks = result[sInd];
        newState[dInd].Tasks = result[dInd];
        setState(newState.filter(state => state.Tasks.length));
        updateTaskParentList(sourceTaskId, destinationListId);
    }
}

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightblue" : "lightblue",
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});