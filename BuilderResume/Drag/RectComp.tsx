import styled from "styled-components";

interface Props {
  isDragging: boolean;
  top: number;
  height: number;
}

const RectComp = styled.div<Props>`
  width: 80px;
  user-select: none;
  height: ${(p: any) => p.height}px;
  background-color: #b4f1e2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  offset-y:auto;
  top: ${(p: any) => 100 +p.top}px;
  transition: ${(p: any) => (p.isDragging ? "none" : "all 500ms")};
  color: black;
  &:hover {
    background-color: skyblue;
  }
  
`;
export default RectComp;
