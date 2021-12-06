import React from "react";
import "./Palette.css";

const Palette = {
  Index: () => {
    const view = (
      <>
        <h4>Layout</h4>
        <div className="palette-container">
          <Palette.SingleCol />
          <Palette.DoubleCol />
          <Palette.TripleCol />
        </div>
        <h4>Items</h4>
        <div className="palette-items">
          <Palette.Button />
          <Palette.Logo />
        </div>
      </>
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
  Button: () => {
    const view = (
      <div className="pal-component-item" id="cta-button">
        <h4>CTA Button</h4>
      </div>
    );
    return view;
  },
  Logo: () => {
    const view = (
      <div className="pal-component-item" id="logo-button">
        <h4>Logo</h4>
      </div>
    );
    return view;
  },
};

export default Palette;
