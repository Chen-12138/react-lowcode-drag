// 八个方向
export const pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];

export const initialAngle: { [x: string]: number } = {
  // 每个点对应的初始角度
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315,
};

export const angleToCursor = [
  // 每个范围的角度对应的光标
  { start: 338, end: 23, cursor: "nw" },
  { start: 23, end: 68, cursor: "n" },
  { start: 68, end: 113, cursor: "ne" },
  { start: 113, end: 158, cursor: "e" },
  { start: 158, end: 203, cursor: "se" },
  { start: 203, end: 248, cursor: "s" },
  { start: 248, end: 293, cursor: "sw" },
  { start: 293, end: 338, cursor: "w" },
];
