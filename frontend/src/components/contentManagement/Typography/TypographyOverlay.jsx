import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import CodeIcon from "@mui/icons-material/Code";
import LinkIcon from "@mui/icons-material/Link";
import FormatClearIcon from "@mui/icons-material/FormatClear";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

function TypographyOverlay({ editor }) {
  const [linkAnchor, setLinkAnchor] = useState(null);
  const [linkUrl, setLinkUrl] = useState("");

  /*
   * =========================
   * Basic formatting
   * =========================
   */

  function toggleBold() {
    editor.chain().focus().toggleBold().run();
  }

  function toggleItalic() {
    editor.chain().focus().toggleItalic().run();
  }

  function toggleUnderline() {
    editor.chain().focus().toggleUnderline().run();
  }

  function toggleStrike() {
    editor.chain().focus().toggleStrike().run();
  }

  /*
   * =========================
   * Lists
   * =========================
   */

  function toggleBulletList() {
    editor.chain().focus().toggleBulletList().run();
  }

  function toggleOrderedList() {
    editor.chain().focus().toggleOrderedList().run();
  }

  /*
   * =========================
   * Inline quote
   * =========================
   *
   * This is NOT Tiptap's blockquote.
   *
   * Selected text:
   *
   * hello world
   *
   * becomes:
   *
   * “hello world”
   *
   * No selection:
   *
   * “”
   *
   * and cursor goes between the quotes.
   */

  function insertQuote() {
    const { from, to } = editor.state.selection;

    const selectedText = editor.state.doc.textBetween(
      from,
      to,
      " "
    );

    if (from !== to && selectedText) {
      editor
        .chain()
        .focus()
        .insertContentAt(
          {
            from,
            to,
          },
          `“${selectedText}”`
        )
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .insertContent("“”")
      .setTextSelection(from + 1)
      .run();
  }

  /*
   * =========================
   * Inline code
   * =========================
   */

  function toggleCode() {
    editor.chain().focus().toggleCode().run();
  }

  /*
   * =========================
   * Heading
   * =========================
   */

  function setHeading(value) {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setHeading({
        level: Number(value),
      })
      .run();
  }

  /*
   * =========================
   * Alignment
   * =========================
   */

  function setAlignment(alignment) {
    editor.chain().focus().setTextAlign(alignment).run();
  }

  /*
   * =========================
   * Font
   * =========================
   */

  function setFontSize(size) {
    if (!size) {
      editor.chain().focus().unsetFontSize().run();
      return;
    }

    editor.chain().focus().setFontSize(size).run();
  }

  function setFontFamily(font) {
    if (!font) {
      editor.chain().focus().unsetFontFamily().run();
      return;
    }

    editor.chain().focus().setFontFamily(font).run();
  }

  /*
   * =========================
   * Link
   * =========================
   */

  function openLinkPopover(event) {
    const currentUrl = editor.getAttributes("link").href || "";

    setLinkUrl(currentUrl);
    setLinkAnchor(event.currentTarget);
  }

  function closeLinkPopover() {
    setLinkAnchor(null);
    setLinkUrl("");
  }

  function applyLink() {
    const url = linkUrl.trim();

    if (!url) {
      editor.chain().focus().unsetLink().run();
      closeLinkPopover();
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();

    closeLinkPopover();
  }

  function removeLink() {
    editor.chain().focus().unsetLink().run();

    closeLinkPopover();
  }

  const textStyle = editor.getAttributes("textStyle");

  const fontSize = textStyle.fontSize || "";

  const fontFamily = textStyle.fontFamily || "";

  const currentBlock = editor.isActive("heading", {
    level: 1,
  })
    ? "1"
    : editor.isActive("heading", {
          level: 2,
        })
      ? "2"
      : editor.isActive("heading", {
            level: 3,
          })
        ? "3"
        : "paragraph";

  return (
    <Box sx={{
      position:"absolute",
      bottom:"100%"
    }}>
      <Box
        onClick={(event) => event.stopPropagation()}
        sx={{
          p: 0.5,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          boxShadow: 3,
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <Stack
          direction="row"
          spacing={0.25}
          alignItems="center"
        >
          {/* ================= HISTORY ================= */}

          <Tooltip title="Undo">
            <span>
              <IconButton
                size="small"
                onClick={() =>
                  editor.chain().focus().undo().run()
                }
                disabled={
                  !editor.can().chain().focus().undo().run()
                }
              >
                <UndoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Redo">
            <span>
              <IconButton
                size="small"
                onClick={() =>
                  editor.chain().focus().redo().run()
                }
                disabled={
                  !editor.can().chain().focus().redo().run()
                }
              >
                <RedoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* ================= BLOCK ================= */}

          <Select
            size="small"
            value={currentBlock}
            onChange={(event) =>
              setHeading(event.target.value)
            }
            sx={{
              minWidth: 105,
              height: 32,
              fontSize: 13,
            }}
          >
            <MenuItem value="paragraph">
              Paragraph
            </MenuItem>

            <MenuItem value="1">
              Heading 1
            </MenuItem>

            <MenuItem value="2">
              Heading 2
            </MenuItem>

            <MenuItem value="3">
              Heading 3
            </MenuItem>
          </Select>

          {/* ================= FONT SIZE ================= */}

          <Select
            size="small"
            displayEmpty
            value={fontSize}
            onChange={(event) =>
              setFontSize(event.target.value)
            }
            sx={{
              minWidth: 70,
              height: 32,
              fontSize: 13,
            }}
            renderValue={(value) =>
              value || "Size"
            }
          >
            <MenuItem value="">
              Default
            </MenuItem>

            <MenuItem value="12px">12</MenuItem>
            <MenuItem value="14px">14</MenuItem>
            <MenuItem value="16px">16</MenuItem>
            <MenuItem value="18px">18</MenuItem>
            <MenuItem value="20px">20</MenuItem>
            <MenuItem value="24px">24</MenuItem>
            <MenuItem value="28px">28</MenuItem>
            <MenuItem value="32px">32</MenuItem>
            <MenuItem value="40px">40</MenuItem>
            <MenuItem value="48px">48</MenuItem>
          </Select>

          {/* ================= FONT FAMILY ================= */}

          <Select
            size="small"
            displayEmpty
            value={fontFamily}
            onChange={(event) =>
              setFontFamily(event.target.value)
            }
            sx={{
              minWidth: 105,
              height: 32,
              fontSize: 13,
            }}
            renderValue={(value) =>
              value || "Font"
            }
          >
            <MenuItem value="">
              Default
            </MenuItem>

            <MenuItem value="Arial">
              Arial
            </MenuItem>

            <MenuItem value="Georgia">
              Georgia
            </MenuItem>

            <MenuItem value="Times New Roman">
              Times New Roman
            </MenuItem>

            <MenuItem value="Verdana">
              Verdana
            </MenuItem>

            <MenuItem value="Courier New">
              Courier New
            </MenuItem>
          </Select>

          <Divider orientation="vertical" flexItem />

          {/* ================= INLINE ================= */}

          <Tooltip title="Bold">
            <IconButton
              size="small"
              onClick={toggleBold}
              color={
                editor.isActive("bold")
                  ? "primary"
                  : "default"
              }
            >
              <FormatBoldIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Italic">
            <IconButton
              size="small"
              onClick={toggleItalic}
              color={
                editor.isActive("italic")
                  ? "primary"
                  : "default"
              }
            >
              <FormatItalicIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Underline">
            <IconButton
              size="small"
              onClick={toggleUnderline}
              color={
                editor.isActive("underline")
                  ? "primary"
                  : "default"
              }
            >
              <FormatUnderlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Strikethrough">
            <IconButton
              size="small"
              onClick={toggleStrike}
              color={
                editor.isActive("strike")
                  ? "primary"
                  : "default"
              }
            >
              <FormatStrikethroughIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* ================= LISTS ================= */}

          <Tooltip title="Bullet list">
            <IconButton
              size="small"
              onClick={toggleBulletList}
              color={
                editor.isActive("bulletList")
                  ? "primary"
                  : "default"
              }
            >
              <FormatListBulletedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Numbered list">
            <IconButton
              size="small"
              onClick={toggleOrderedList}
              color={
                editor.isActive("orderedList")
                  ? "primary"
                  : "default"
              }
            >
              <FormatListNumberedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* ================= ALIGNMENT ================= */}

          <Tooltip title="Align left">
            <IconButton
              size="small"
              onClick={() =>
                setAlignment("left")
              }
              color={
                editor.isActive({
                  textAlign: "left",
                })
                  ? "primary"
                  : "default"
              }
            >
              <FormatAlignLeftIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align center">
            <IconButton
              size="small"
              onClick={() =>
                setAlignment("center")
              }
              color={
                editor.isActive({
                  textAlign: "center",
                })
                  ? "primary"
                  : "default"
              }
            >
              <FormatAlignCenterIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align right">
            <IconButton
              size="small"
              onClick={() =>
                setAlignment("right")
              }
              color={
                editor.isActive({
                  textAlign: "right",
                })
                  ? "primary"
                  : "default"
              }
            >
              <FormatAlignRightIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Justify">
            <IconButton
              size="small"
              onClick={() =>
                setAlignment("justify")
              }
              color={
                editor.isActive({
                  textAlign: "justify",
                })
                  ? "primary"
                  : "default"
              }
            >
              <FormatAlignJustifyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* ================= INLINE QUOTE ================= */}

          <Tooltip title="Insert quotation marks">
            <IconButton
              size="small"
              onClick={insertQuote}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                }}
              >
                “
              </Typography>
            </IconButton>
          </Tooltip>

          {/* ================= CODE ================= */}

          <Tooltip
            title={
              editor.isActive("code")
                ? "Remove inline code"
                : "Inline code"
            }
          >
            <IconButton
              size="small"
              onClick={toggleCode}
              color={
                editor.isActive("code")
                  ? "primary"
                  : "default"
              }
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* ================= LINK ================= */}

          <Tooltip
            title={
              editor.isActive("link")
                ? "Edit link"
                : "Add link"
            }
          >
            <IconButton
              size="small"
              onClick={openLinkPopover}
              color={
                editor.isActive("link")
                  ? "primary"
                  : "default"
              }
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* ================= CLEAR ================= */}

          <Tooltip title="Clear formatting">
            <IconButton
              size="small"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .clearNodes()
                  .unsetAllMarks()
                  .run()
              }
            >
              <FormatClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* ================= LINK POPOVER ================= */}

      <Popover
        open={Boolean(linkAnchor)}
        anchorEl={linkAnchor}
        onClose={closeLinkPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            width: 300,
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="URL"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(event) =>
              setLinkUrl(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applyLink();
              }
            }}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{ mt: 1.5 }}
          >
            {editor.isActive("link") && (
              <Button
                size="small"
                color="error"
                onClick={removeLink}
              >
                Remove
              </Button>
            )}

            <Button
              size="small"
              onClick={closeLinkPopover}
            >
              Cancel
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={applyLink}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
}

export default TypographyOverlay;