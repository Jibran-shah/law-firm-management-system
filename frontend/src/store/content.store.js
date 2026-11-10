class DocumentStore {
  constructor() {
    this.nodes = new Map();
    this.selectedNodeId = null;
    this.selectionSubscribers = new Set();
    this.root = null;
    this.rootSubscribers = new Set();
  }

  getNode(id) {
    return this.nodes.get(id) ?? null;
  }

  getRoot() {
    return this.root;
  }

  getParent(id) {
    const node = this.getNode(id);
    return node?.parentId ? this.getNode(node.parentId) : null;
  }

  getAncestors(id) {
    const ancestors = [];
    let current = this.getNode(id);
    while (current?.parentId) {
      const parent = this.getNode(current.parentId);
      if (!parent) break;
      ancestors.push(parent);
      current = parent;
    }
    return ancestors;
  }

  subscribeRoot(listener) {
    this.rootSubscribers.add(listener);
    return () => this.rootSubscribers.delete(listener);
  }

  subscribeNode(id, listener) {
    const node = this.getNode(id);
    if (!node) return () => {};
    node.subscribers.add(listener);
    return () => node.subscribers.delete(listener);
  }

  subscribeSelection(listener) {
    this.selectionSubscribers.add(listener);
    return () => this.selectionSubscribers.delete(listener);
  }

  notifyNode(id) {
    const node = this.getNode(id);
    if (!node) return;
    node.subscribers.forEach((listener) => listener());
  }

  notifyRoot() {
    this.rootSubscribers.forEach((listener) => listener());
  }

  setRoot(node) {
    this.root = node ? this.getNode(node.id) ?? node : null;
    this.notifyRoot();
  }

  addNode(node) {
    if (this.nodes.has(node.id))
      throw new Error(`Node "${node.id}" already exists.`);
    const newNode = {
      ...node,
      children: [...(node.children ?? [])],
      subscribers: new Set(),
    };
    this.nodes.set(newNode.id, newNode);
    return newNode;
  }

  removeNode(id) {
    const node = this.getNode(id);
    if (!node) return;
    if (node.parentId)
      this.removeChild(node.parentId, id);
    const children = [...node.children];
    children.forEach((child) => {
      this.removeNode(child.id);
    });
    this.nodes.delete(id);
    if (this.selectedNodeId === id)
      this.selectNode(null);
    if (this.root?.id === id) {
      this.root = null;
      this.notifyRoot();
    }
    node.subscribers.forEach((listener) => listener());
    node.subscribers.clear();
  }

  updateNode(id, changes) {
    const node = this.getNode(id);
    if (!node) return;
    const updatedNode = {
      ...node,
      ...changes,
      subscribers: node.subscribers,
    };
    this.nodes.set(id, updatedNode);
    if (this.root?.id === id) {
      this.root = updatedNode;
      this.notifyRoot();
    }
    this.notifyNode(id);
    return updatedNode;
  }

  updateNodeContent(id, changes) {
    const node = this.getNode(id);
    if (!node) return;
    return this.updateNode(id, {
      content: {
        ...node.content,
        ...changes,
      },
    });
  }

  updateNodeStyles(id, changes) {
    const node = this.getNode(id);
    if (!node) return;
    return this.updateNodeContent(id, {
      styles: {
        ...node.content?.styles,
        ...changes,
      },
    });
  }

  newNode(type){
    return {
      id: crypto.randomUUID(),
      type,
      content: {
        styles: {},
      },
      children: [],
    }
  }

  insertChild(parentId, type, index) {
    const node = this.newNode(type);
    const parent = this.getNode(parentId);
    if (!parent)
      throw new Error(`Parent node "${parentId}" not found.`);
    if (this.nodes.has(node.id))
      throw new Error(`Node "${node.id}" already exists.`);
    const newNode = this.addNode({
      ...node,
      parentId,
    });
    const children = [...(parent.children ?? [])];
    if (index === undefined)
      children.push(newNode);
    else {
      const position = Math.max(0, Math.min(index, children.length));
      children.splice(position, 0, newNode);
    }
    this.updateNode(parentId, { children });
    console.log(this.getNode(parentId))
    return newNode;
  }

  removeChild(parentId, childId) {
    const parent = this.getNode(parentId);
    const child = this.getNode(childId);
    if (!parent || !child || child.parentId !== parentId)
      return;
    const children = parent.children.filter((item) => item.id !== childId);
    this.updateNode(parentId, { children });
    this.removeNode(childId);
  }

  moveNode(nodeId, newParentId, index) {
    const node = this.getNode(nodeId);
    const newParent = this.getNode(newParentId);

    if (!node || !newParent) return;

    if (
      nodeId === newParentId ||
      this.getAncestors(newParentId).some(
        (ancestor) => ancestor.id === nodeId
      )
    ) {
      throw new Error("Cannot move a node into itself or its descendants.");
    }

    const oldParent = node.parentId
      ? this.getNode(node.parentId)
      : null;

    const children = (oldParent?.children ?? []).filter(
      (child) => child.id !== nodeId
    );

    const targetChildren =
      oldParent?.id === newParentId
        ? children
        : [...(newParent.children ?? [])];

    const position =
      index === undefined
        ? targetChildren.length
        : Math.max(0, Math.min(index, targetChildren.length));

    targetChildren.splice(position, 0, node);

    if (oldParent && oldParent.id !== newParentId) {
      this.updateNode(oldParent.id, { children });
    }

    const updatedNode = this.updateNode(nodeId, {
      parentId: newParentId,
    });

    targetChildren[position] = updatedNode;

    this.updateNode(newParentId, {
      children: targetChildren,
    });

    return updatedNode;
  }

  selectNode(id) {
    if (id !== null && !this.nodes.has(id)) return;
    if (this.selectedNodeId === id) return;
    this.selectedNodeId = id;
    this.selectionSubscribers.forEach((listener) => listener());
  }

  getSelectedNode() {
    return this.selectedNodeId
      ? this.getNode(this.selectedNodeId)
      : null;
  }

  clear() {
    const nodes = [...this.nodes.values()];
    this.nodes.clear();
    this.selectedNodeId = null;
    this.root = null;
    nodes.forEach((node) => {
      node.subscribers.forEach((listener) => listener());
      node.subscribers.clear();
    });
    this.notifyRoot();
    this.selectionSubscribers.forEach((listener) => listener());
  }
}

export const documentStore = new DocumentStore();
