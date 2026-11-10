
import { useState, useSyncExternalStore } from "react";

import {
  Box,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { documentStore } from "../../store/content.store";
import componentsRegistry from "../../registeries/contentComponents";

function EditorSidebar() {
  
  const [activeTab, setActiveTab] = useState("content");

  const selectedNodeId = useSyncExternalStore(
    (listener) => documentStore.subscribeSelection(listener),
    () => documentStore.selectedNodeId
  );

  const node = useSyncExternalStore(
    (listener)=>documentStore.subscribeNode(selectedNodeId,listener),
    ()=> documentStore.getNode(selectedNodeId)
  )

  if (!node) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">
          Select an element to edit it.
        </Typography>
      </Box>
    );
  }

  const component = componentsRegistry[node.type];
  if (!component) return null;
  const parentLayoutNode = documentStore.getParent(node.id);
  const ParentLayoutToolbar = parentLayoutNode
    ? componentsRegistry[parentLayoutNode.type]?.toolbar
    : null;

  const ContentToolbar = component.contentToolbar;
  const StylesToolbar = component.stylesToolbar;
  const AdvancedToolbar = component.advancedToolbar;

  const tabContent = {
    content: ContentToolbar,
    styles: StylesToolbar,
    advanced: AdvancedToolbar,
  };

  const ActiveToolbar = tabContent[activeTab];

  return (
    <Stack sx={{ height: "100%", minHeight: 0 }}>
      <Box sx={{ flexShrink: 0, p: 2, pb: 1 }}>
        <Typography variant="subtitle1" align="center" noWrap>
          { NODE_LABELS[node.type] || node.type}
        </Typography>
      </Box>
      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          flexShrink: 0,
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            minWidth: "auto",
            flex: 1,
            px: 1.5,
            textTransform: "none",
          },
        }}
      >
        {SETTINGS_TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 2 }}>
        {ActiveToolbar ? (
          <ActiveToolbar node={node} key={`${node.id}-${activeTab}`} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No {activeTab} settings available.
          </Typography>
        )}

        {/* Parent layout settings */}
        {ParentLayoutToolbar && (
          <>
            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
              Parent Layout
            </Typography>

            <ParentLayoutToolbar node={parentLayoutNode} />
          </>
        )}
      </Box>
    </Stack>
  );
}

export default EditorSidebar;


const SETTINGS_TABS = [
  { label: "Content", value: "content" },
  { label: "Styles", value: "styles" },
  { label: "Advanced", value: "advanced" },
];

const NODE_LABELS = {
  "layout:vertical": "Vertical Layout",
  "layout:horizontal": "Horizontal Layout",
  text: "Text",
  image: "Image",
  video: "Video",
};