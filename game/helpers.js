export function isInView(object, viewport, scrollOffset) {
  return (
    object.x + object.width > scrollOffset &&
    object.x < scrollOffset + viewport.width &&
    object.y + object.height > 0 &&
    object.y < viewport.height
  );
}

export function renderIfInView(object, ctx, viewport, scrollOffset) {
  if (isInView(object, viewport, scrollOffset)) {
    object.render(ctx);
  }
}