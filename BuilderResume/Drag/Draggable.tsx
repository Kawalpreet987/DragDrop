import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  ReactElement,
} from "react";
interface Translation {
  x: number;
  y: number;
}
type Props = {
  children: ReactElement;
  id: number;
  onDragEnd: ({}:any) => void;
  onDrag: ({ translation, id }: DragEventData) => void;
};

interface DragEventData {
  translation: Translation;
  id: number;
}

const Draggable = ({ children, id, onDrag, onDragEnd }: Props) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    translation: { x: 0, y: 0 },
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };
      setState((state) => ({
        ...state,
        translation: translation,
      }));
      onDrag({ translation: state.translation, id });
    },
    [state.origin, onDrag, id]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));

    onDragEnd({});
  }, [onDragEnd]);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setState((state) => ({ ...state, translation: { x: 0, y: 0 } }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.translation]
  );

  return (
    <div style={styles as any} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
