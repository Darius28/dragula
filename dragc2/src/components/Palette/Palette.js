import React from "react";
import "./Palette.css";

const Palette = {
  Index: () => {
    const view = (
      <div className="palette-container">
        <Palette.SingleCol />
        <Palette.DoubleCol />
        <Palette.TripleCol />
      </div>
    );
    return view;
  },
  SingleCol: () => {
    const view = (
      <div className="pal-col-1 pal-item item-layer">
        <div className="pal-text">1 Column</div>
      </div>
    );
    return view;
  },
  DoubleCol: () => {
    const view = (
      <div className="pal-col-2 pal-item item-layer">
        <div className="pal-text">2 Columns</div>
      </div>
    );
    return view;
  },
  TripleCol: () => {
    const view = (
      <div className="pal-col-3 pal-item item-layer">
        <div className="pal-text">3 Columns</div>
      </div>
    );
    return view;
  },
};

export default Palette;
