import { useEffect, useState, useSyncExternalStore } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  Box,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import { apiClient } from "../../api/client.api";
import { documentStore } from "../../store/content.store";
import { generateId } from "../../utils/crypto.utils";

import NodeRenderer from "../../components/contentManagement/NodeEditorRenderer";
import EditorSidebar from "../../components/contentManagement/EditorSideBar";
import { TreeNode } from "../../components/contentManagement/TreeNode";
import BlogEditorToolbar from "../../components/contentManagement/BlogEditorToolbar";
import BlogDetailsForm from "../../components/blogs/CreateBlogForm";

/**
 *
 * @returns {JSX.Element}
 */
function CreateBlog() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blogId, setBlogId] = useState("1");

  const root = useSyncExternalStore(
    (listener) => documentStore.subscribeRoot(listener),
    () => documentStore.getRoot()
  );

  const createBlogMutation = useMutation({
    mutationFn: async ({ title, description, image }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("status", "draft");
      formData.append("image", image);
      console.log("before calling api")
      const response = await apiClient.post("blogs", formData);
      console.log("after calling api")
      console.log("response",response)
      return response.data?.data?.blog;
    },

    onSuccess: (blog) => {
      console.log(blog)
      if (!blog?._id) {
        return;
      }

      setBlogId(blog._id);
    },
  });

  useEffect(() => {
    if (!blogId) return;

    const rootNode = {
      id: generateId(),
      type: "Layout Vertical",
      parentId: null,
      children: [],
      version: 0,
      subscribers: new Set(),
      gap: 16,
    };

    documentStore.setRoot(rootNode);
    documentStore.addNode(rootNode);
    documentStore.selectNode(rootNode.id);

    return () => documentStore.clear();
  }, [blogId]);

  if (!blogId) {
    return (
      <BlogDetailsForm
        onSubmit={(values) =>{
          console.log(values)
          createBlogMutation.mutate(values)
        }}
        isSubmitting={createBlogMutation.isPending}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <BlogEditorToolbar blogId={blogId} root={root} />

      <Box
        sx={{
          ...createBlogContainerSx,
          flex: 1,
          minHeight: 0,
          height: "auto",
        }}
      >
        {/* Blog structure tree */}
        <Box component="aside" sx={blogTreeSidebarSx}>
          <Box sx={blogTreeHeaderSx}>
            <AccountTreeOutlinedIcon fontSize="small" color="action" />
            <Typography fontWeight={600} fontSize={14}>
              Blog Structure
            </Typography>
          </Box>

          <Box sx={blogTreeContentSx}>
            {root ? (
              <List dense disablePadding>
                <TreeNode node={root} />
              </List>
            ) : (
              <Typography color="text.secondary" variant="body2" sx={{ p: 1 }}>
                Loading structure...
              </Typography>
            )}
          </Box>
        </Box>

        {/* Blog editor canvas */}
        <Box component="main" sx={createBlogMainSx}>
          {root && <NodeRenderer node={root} />}
        </Box>

        {/* Editor settings sidebar */}
        <Box component="aside" sx={editorSettingsSidebarSx(sidebarOpen)}>
          <Box sx={editorSettingsContentSx}>
            <EditorSidebar />
          </Box>
        </Box>

        {/* Toggle settings sidebar */}
        <Tooltip title={sidebarOpen ? "Hide settings" : "Show settings"}>
          <IconButton
            onClick={() => setSidebarOpen((open) => !open)}
            sx={editorSidebarToggleSx(sidebarOpen)}
          >
            {sidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default CreateBlog;

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const createBlogContainerSx = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
};

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const blogTreeSidebarSx = {
  width: 260,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  borderRight: 1,
  borderColor: "divider",
  bgcolor: "background.paper",
};

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const blogTreeHeaderSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 2,
  py: 2,
  borderBottom: 1,
  borderColor: "divider",
};

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const blogTreeContentSx = {
  flex: 1,
  overflow: "auto",
  p: 1,
};

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const createBlogMainSx = {
  flex: 1,
  minWidth: 0,
  overflow: "auto",
  p: 1,
  position: "relative",
};

/**
 * @param {boolean} sidebarOpen
 * @returns {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const editorSettingsSidebarSx = (sidebarOpen) => ({
  width: sidebarOpen ? 320 : 0,
  flexShrink: 0,
  borderLeft: sidebarOpen ? 1 : 0,
  borderColor: "divider",
  overflow: "hidden",
  transition: "width 200ms ease",
});

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const editorSettingsContentSx = {
  width: 320,
  height: "100%",
  overflow: "auto",
};

/**
 * @param {boolean} sidebarOpen
 * @returns {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
export const editorSidebarToggleSx = (sidebarOpen) => ({
  position: "absolute",
  top: "50%",
  right: sidebarOpen ? 320 : 0,
  transform: "translateY(-50%)",
  zIndex: 20,
  width: 36,
  height: 48,
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: "6px 0 0 6px",
  boxShadow: 2,
  transition: "right 200ms ease",
  "&:hover": {
    bgcolor: "action.hover",
  },
});