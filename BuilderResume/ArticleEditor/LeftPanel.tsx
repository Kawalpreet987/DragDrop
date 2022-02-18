import { FC } from "react";
import DndList from "../Drag/DndList";
interface Item {
  id: number;
  value: string;
}
type Props = {
  items: Item[];
};
export const LeftPanel: FC<Props> = (props: Props) => {
  return (
    <>
      <DndList
        listItems={props.items}
        renderItem={(item) => <>{item}</>}
      ></DndList>
    </>
  );
};

export default LeftPanel;
