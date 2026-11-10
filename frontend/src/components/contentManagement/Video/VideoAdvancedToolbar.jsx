import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";

const VideoAdvancedToolbar = ({ node }) => {
  const updateNode = (updates) => {
    node.update?.(updates);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="HTML ID"
        size="small"
        fullWidth
        value={node?.htmlId ?? ""}
        onChange={(event) => updateNode({ htmlId: event.target.value })}
      />

      <TextField
        label="CSS Class"
        size="small"
        fullWidth
        value={node?.cssClass ?? ""}
        onChange={(event) => updateNode({ cssClass: event.target.value })}
      />

      <FormControlLabel
        label="Hide Video"
        control={
          <Switch
            checked={Boolean(node?.hidden)}
            onChange={(event) => updateNode({ hidden: event.target.checked })}
          />
        }
      />

      <FormControlLabel
        label="Autoplay"
        control={
          <Switch
            checked={Boolean(node?.autoplay)}
            onChange={(event) =>
              updateNode({ autoplay: event.target.checked })
            }
          />
        }
      />

      <FormControlLabel
        label="Loop"
        control={
          <Switch
            checked={Boolean(node?.loop)}
            onChange={(event) => updateNode({ loop: event.target.checked })}
          />
        }
      />

      <FormControlLabel
        label="Muted"
        control={
          <Switch
            checked={Boolean(node?.muted)}
            onChange={(event) => updateNode({ muted: event.target.checked })}
          />
        }
      />

      <FormControlLabel
        label="Show Controls"
        control={
          <Switch
            checked={node?.controls !== false}
            onChange={(event) =>
              updateNode({ controls: event.target.checked })
            }
          />
        }
      />
    </Stack>
  );
};

export default VideoAdvancedToolbar;