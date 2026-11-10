
import {
  Stack,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { documentStore } from "../../../store/content.store";
import componentsRegistry from "../../../registeries/contentComponents";

const HorizontalLayoutContentToolbar = ({ node }) => {

  const styles = node.content?.styles ?? {};

  const children = node.children ?? [];

  const updateStyles = (updates) => documentStore.updateNodeStyles(node.id,updates)

  const addChild = (type) => documentStore.insertChild(node.id, type)

  const removeChild = (childId) => documentStore.removeChild(node.id, childId);

  const moveChild = (childId, direction)=>{
    const index = children.findIndex((child) => child.id === childId);
    documentStore.moveNode(childId, node.id, index + direction);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Gap (px)"
        type="number"
        size="small"
        fullWidth
        value={styles.gap ?? 16}
        onChange={(event) =>
          updateStyles({
            gap:
              event.target.value === ""
                ? ""
                : Number(event.target.value),
          })
        }
        slotProps={{ htmlInput: { min: 0, max: 200 } }}
      />

      <TextField
        select
        label="Vertical Alignment"
        size="small"
        fullWidth
        value={styles.alignItems ?? "center"}
        onChange={(event) =>
          updateStyles({ alignItems: event.target.value })
        }
      >
        <MenuItem value="flex-start">Top</MenuItem>
        <MenuItem value="center">Center</MenuItem>
        <MenuItem value="flex-end">Bottom</MenuItem>
        <MenuItem value="stretch">Stretch</MenuItem>
      </TextField>

      <TextField
        select
        label="Horizontal Distribution"
        size="small"
        fullWidth
        value={styles.justifyContent ?? "flex-start"}
        onChange={(event) =>
          updateStyles({ justifyContent: event.target.value })
        }
      >
        <MenuItem value="flex-start">Start</MenuItem>
        <MenuItem value="center">Center</MenuItem>
        <MenuItem value="flex-end">End</MenuItem>
        <MenuItem value="space-between">Space Between</MenuItem>
        <MenuItem value="space-around">Space Around</MenuItem>
        <MenuItem value="space-evenly">Space Evenly</MenuItem>
      </TextField>

      <Divider />

      <Stack spacing={1} >
        <Typography fontWeight={600}>Children</Typography>
        {children.map((child, index) => (
          <Stack
            key={child.id}
            direction="row"
            spacing={1}
            sx={{
              alignItems:"center", 
            }}
          >
            <Typography variant="body2" sx={{flex:1,}}>
              {child.type}
            </Typography>

            <IconButton
              size="small"
              disabled={index === 0}
              onClick={() => moveChild(child.id, -1)}
              sx={{ml:"auto"}}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              disabled={index === children.length - 1}
              onClick={() => moveChild(child.id, 1)}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={() => removeChild(child.id)}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}

        <TextField
          select
          label="Add Child Node"
          size="small"
          fullWidth
          value=""
          onChange={(event) => addChild(event.target.value)}
        >
          {Object.keys(componentsRegistry).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Stack>
  );
};

export default HorizontalLayoutContentToolbar;