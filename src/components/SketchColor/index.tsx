// Copyright 2021 zhaoarden
import React, { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { RGBColor, SketchPicker } from "react-color";

interface SketchColorPorps {
  value?: string;
  onChange?: (val: string) => string;
}

const hexToRgba = (hex: string = "") => {
  return {
    r: parseInt("0x" + hex.slice(1, 3)),
    g: parseInt("0x" + hex.slice(3, 5)),
    b: parseInt("0x" + hex.slice(5, 7)),
    a: 1,
  };
};

const SketchColor: React.FC<SketchColorPorps> = ({ value, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorData, setColorData] = useState({} as RGBColor);

  useEffect(() => {
    setColorData(hexToRgba(value));
  }, [value]);

  // rgbaTohex(color) {
  //     return '#'+Number(color.r).toString(16)+Number(color.g).toString(16)+Number(color.b).toString(16);
  // }

  const handleClick = () => {
    setDisplayColorPicker((state) => !state);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: { rgb: any; hex: string }) => {
    onChange?.(color.hex);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, ${colorData.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: 2,
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker && (
        <div style={styles.popover as any}>
          <div style={styles.cover as any} onClick={handleClose} />
          <SketchPicker color={colorData} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default SketchColor;
