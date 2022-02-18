import React, { useState, FC, useCallback, ReactElement } from "react";
import Draggable from "./Draggable";
import RectComp from "./RectComp";

const HEIGHT = 80;

interface Props {
  listItems: any[];
  renderItem: (item: any) => ReactElement;
}

const DndList: FC<Props> = ({ listItems, renderItem }: Props) => {
  const [state, setState] = useState({
    order: listItems,
    dragOrder: listItems, 
    draggedIndex: null
  });

  const onDragStart = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT);
      const index = state.order.indexOf(id);

      const dragOrder = state.order.filter((index) => index !== id);
      dragOrder.splice(index + delta, 0, id);
      setState((state) => ({
        ...state,
        draggedIndex: id,
        dragOrder
      }));
    },
    [state.order]
  );

  const onDragEnd = useCallback(() => {
    setState((state) => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }));
  },[]);

  return (
    <div>
      {listItems.map((item, index) => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT+ 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT - 25);
        return (
          <Draggable
            key={index}
            id={index}
            onDrag={() => onDragStart}
            onDragEnd={()=>onDragEnd}
          >
            <RectComp
              height={HEIGHT}
              isDragging={isDragging}
              top={isDragging ? draggedTop : top}
            >
              {renderItem(item.value)}
            </RectComp>
          </Draggable>
        );
      })}
    </div>
  );
};

DndList.defaultProps = {
  listItems: [],
  renderItem: (item) => item
};

export default DndList;
