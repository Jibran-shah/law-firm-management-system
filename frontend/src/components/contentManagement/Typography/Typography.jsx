import { useEditor, EditorContent, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FontFamily from "@tiptap/extension-font-family";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { documentStore } from "../../../store/content.store.js";
import { useDebouncedCallback } from "../../../hooks/useDebounceCallback.js";
import TypographyOverlay from "./TypographyOverlay.jsx";
import { TextStyle } from "@tiptap/extension-text-style";

function Typography({ node, selected = false }) {
  const content = node.content ?? {};
  const styles = content.styles ?? {};

  const updateText = useDebouncedCallback((value) => {
    const currentNode = documentStore.getNode(node.id);

    if (!currentNode) return;

    documentStore.updateNode(node.id, {
      content: {
        ...(currentNode.content ?? {}),
        text: value,
      },
    });
  }, 300);

  const editor = useEditor({
    extensions,
    content: content.text ?? {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    editable: true,
    onUpdate: ({ editor }) => {
      updateText(editor.getJSON());
    },
  });

  useEffect(() => {
    editor?.setEditable(selected);
  }, [editor, selected]);

  if (!editor) return null;

  const textAreaStyles = {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",

    // Debug background: actual text area
    backgroundColor: selected ? "#fff3cd" : "#d1fae5",

    ...styles,

    "& .tiptap": {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      width: "100%",
      minHeight: 0,
    },

    "& .ProseMirror": {
      outline: "none",
      flex: 1,
      width: "100%",
      minHeight: "100%",
      height: "100%",
      boxSizing: "border-box",
      padding: 0,
      margin: 0,
      border: 0,
      background: "transparent",
      color: "inherit",
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit",
      textAlign: "inherit",
    },

    "& p, & h1, & h2, & h3, & h4, & h5, & h6": {
      margin: 0,
    },
  };

  const html = content.text
    ? generateHTML(content.text, extensions)
    : "";

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {selected && <TypographyOverlay editor={editor} />}
      <Box sx={textAreaStyles}>
        {selected ? (
          <EditorContent editor={editor} />
        ) : (
          <Box
            sx={{
              flex: 1,
              width: "100%",
              minHeight: "100%",
              boxSizing: "border-box",
              "& p, & h1, & h2, & h3, & h4, & h5, & h6": {
                margin: 0,
              },
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </Box>
    </Box>
  );
}

export default Typography;

const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark(this.name, { fontSize }).run(),

      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark(this.name, { fontSize: null }).run(),
    };
  },
});

const extensions = [
  StarterKit.configure({
    underline: false,
    link: false,
  }),

  FontSize,

  FontFamily.configure({ types: ["textStyle"] }),
  Color.configure({ types: ["textStyle"] }),
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),

  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
];