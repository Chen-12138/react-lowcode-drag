export function getComponentWrapStyle(style: { [x: string]: string }) {
  const result: { [x: string]: string } = {};
  ["width", "height", "top", "left", "rotate"].forEach((attr) => {
    if (attr !== "rotate") {
      result[attr] = style[attr];
    } else {
      result.transform = "rotate(" + style[attr] + "deg)";
    }
  });

  return result;
}

// 需要单位的样式
const needUnit = [
  "fontSize",
  "width",
  "height",
  "top",
  "left",
  "borderWidth",
  "letterSpacing",
  "borderRadius",
];

const svgFilterAttrs = ["width", "height", "top", "left", "rotate"];

export function getStyle(
  style: { [x: string]: string },
  filter: string[] = []
) {
  const result: { [x: string]: string } = {};
  Object.keys(style).forEach((key) => {
    if (!svgFilterAttrs.includes(key)) {
      if (key !== "rotate") {
        result[key] = style[key];

        // if (needUnit.includes(key)) {
        //   result[key] += "px";
        // }
      } else {
        result.transform = key + "(" + style[key] + "deg)";
      }
    }
  });

  return result;
}
