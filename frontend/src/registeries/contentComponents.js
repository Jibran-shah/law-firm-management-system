import {
  Video,
  VideoContentToolbar,
  VideoStylesToolbar,
  VideoAdvancedToolbar,
} from "../components/contentManagement/Video";

import {
  Image,
  ImageContentToolbar,
  ImageStylesToolbar,
  ImageAdvancedToolbar,
} from "../components/contentManagement/Image";

import {
  Typography,
  TypographyContentToolbar,
  TypographyStylesToolbar,
  TypographyAdvancedToolbar,
} from "../components/contentManagement/Typography";

import {
  VerticalLayout,
  VerticalLayoutContentToolbar,
  VerticalLayoutStylesToolbar,
  VerticalLayoutAdvancedToolbar,
  HorizontalLayout,
  HorizontalLayoutContentToolbar,
  HorizontalLayoutStylesToolbar,
  HorizontalLayoutAdvancedToolbar,
} from "../components/contentManagement/Layout";

import {
  Button,
  ButtonContentToolbar,
  ButtonStylesToolbar,
  ButtonAdvancedToolbar,
} from "../components/contentManagement/Button";

const componentsRegistry = {
  Video: {
    component: Video,
    contentToolbar: VideoContentToolbar,
    stylesToolbar: VideoStylesToolbar,
    advancedToolbar: VideoAdvancedToolbar,
  },

  Image: {
    component: Image,
    contentToolbar: ImageContentToolbar,
    stylesToolbar: ImageStylesToolbar,
    advancedToolbar: ImageAdvancedToolbar,
  },

  Typography: {
    component: Typography,
    contentToolbar: TypographyContentToolbar,
    stylesToolbar: TypographyStylesToolbar,
    advancedToolbar: TypographyAdvancedToolbar,
  },

  "Layout Vertical": {
    component: VerticalLayout,
    contentToolbar: VerticalLayoutContentToolbar,
    stylesToolbar: VerticalLayoutStylesToolbar,
    advancedToolbar: VerticalLayoutAdvancedToolbar,
  },

  "Layout Horizontal": {
    component: HorizontalLayout,
    contentToolbar: HorizontalLayoutContentToolbar,
    stylesToolbar: HorizontalLayoutStylesToolbar,
    advancedToolbar: HorizontalLayoutAdvancedToolbar,
  },

  Button: {
    component: Button,
    contentToolbar: ButtonContentToolbar,
    stylesToolbar: ButtonStylesToolbar,
    advancedToolbar: ButtonAdvancedToolbar,
  },
};

export default componentsRegistry;