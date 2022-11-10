export function getComponentWrapStyle(style: { [x: string]: string }) {
  const result: { [x: string]: string } = {};
  ["width", "height", "top", "left", "rotate"].forEach((attr) => {
    if (attr !== "rotate") {
      result[attr] = style[attr] + "px";
    } else {
      result.transform = "rotate(" + style[attr] + "deg)";
    }
  });

  return result;
}
