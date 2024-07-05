export function handleScrolling(player, canvas, scrollOffset) {
  const playerCenterX = player.x + player.width / 2;

  // Garder le joueur centré sur l'écran
  let newScrollOffset = playerCenterX - canvas.width / 2;

  // Empêche le défilement au-delà du bord gauche du canvas
  if (newScrollOffset < 0) {
    newScrollOffset = 0;
  }

  // Empêche le défilement au-delà du bord droit du canvas
  const maxScrollOffset = canvas.width * 2 - canvas.width + 200;
  if (newScrollOffset > maxScrollOffset) {
    newScrollOffset = maxScrollOffset;
  }

  return newScrollOffset;
}