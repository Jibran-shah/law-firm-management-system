import componentsRegistry from "../../registeries/contentComponents.js";

function NodeRenderer({ node }) {
  const component = componentsRegistry[node.type];
  if (!component?.render) return null;
  const Component = component.render;
  return <Component node={node} />;
}

export default NodeRenderer;