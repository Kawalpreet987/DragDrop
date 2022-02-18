import { Grid, Paper } from "@mui/material";
import LeftPanel from "./LeftPanel";
import {MiddlePanel} from "./MiddlePanel";
import {RightPanel} from "./RightPanel";
// import DndList from "../Dragable/DndList";
const items = [
  { id: 1, value: "text" },
  { id: 2, value: "h1" },
  { id: 3, value: "p" }
];
export default function ArticleEditor() {
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} component={Paper}>
        <LeftPanel items={items} />
      </Grid>
      <Grid item xs={6} component={Paper}>
        <MiddlePanel />
      </Grid>
      <Grid item xs={3} component={Paper}>
        <RightPanel />
      </Grid>
    </Grid>
  );
}
