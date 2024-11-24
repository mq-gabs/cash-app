export default function genHSLColorsCSS(size: number) {
  const start = 0;
  const end = 320;
  const step = (end - start) / ((size - 1) || 1);

  const colors = [];

  for (let i = 0; i < size; i++) {
    colors.push(`hsl(${start + (step*i)}deg, 60%, 50%)`);
  }

  return colors;
}