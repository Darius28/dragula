import React, { useContext, useLayoutEffect } from "react";
import { Context } from "../../context";
import "./Canvas.module.css";

const Canvas = {
  Index: () => {
    const {
      providerObj: { layers },
    } = useContext(Context);
    const view =
      layers &&
      layers.map((item, index) => {
        return <Canvas.GetElement key={index} row={index} data={item} />;
      });
    return view;
  },
  GetElement: ({ row, data }) => {
    if (!data) {
      return <div className="block-default"></div>;
    }
    switch (data.id) {
      case "pal-col-1":
        return <Canvas.SingleCol row={row} data={data.data} />;
      case "pal-col-2":
        return <Canvas.DoubleCol row={row} data={data.data} />;
      case "pal-col-3":
        return <Canvas.TripleCol row={row} data={data.data} />;
      case "cta-button":
        return <Canvas.CTAButton row={row} data={data.data} />;
      case "logo-button":
        return <Canvas.Logo row={row} data={data.data} />;
      default:
        return <div>FAIL</div>;
    }
  },
  SingleCol: ({ row, data }) => {
    console.log("SingleCol data: ", data);
    const view = (
      <div
        className="pal-col-1 item-layer canvas-single canvas-item"
        id={`row-${row}`}
      >
        <div
          className={`hot-pan ${data[0] ? "filled" : ""}`}
          id={`block-${row}-0`}
        >
          <Canvas.GetElement row={row} data={data[0]} />
        </div>
      </div>
    );
    return view;
  },
  DoubleCol: ({ row, data }) => {
    const view = (
      <div
        className="pal-col-2 item-layer canvas-double canvas-item"
        id={`row-${row}`}
      >
        <div
          className={`hot-pan ${data[0] && data[0].id ? "filled" : ""}`}
          id={`block-${row}-0`}
        >
          <Canvas.GetElement row={row} data={data[0]} />
        </div>
        <div
          className={`hot-pan ${data[1] && data[1].id ? "filled" : ""}`}
          id={`block-${row}-1`}
        >
          <Canvas.GetElement row={row} data={data[1]} />
        </div>
      </div>
    );
    return view;
  },
  TripleCol: ({ row, data }) => {
    const view = (
      <div
        className="pal-col-3 item-layer canvas-triple canvas-item"
        id={`row-${row}`}
      >
        <div
          className={`hot-pan ${data[0] && data[0].id ? "filled" : ""}`}
          id={`block-${row}-0`}
        >
          <Canvas.GetElement row={row} data={data[0]} />
        </div>
        <div
          className={`hot-pan ${data[1] && data[1].id ? "filled" : ""}`}
          id={`block-${row}-1`}
        >
          <Canvas.GetElement row={row} data={data[1]} />
        </div>
        <div
          className={`hot-pan ${data[2] && data[2].id ? "filled" : ""}`}
          id={`block-${row}-2`}
        >
          <Canvas.GetElement row={row} data={data[2]} />
        </div>
      </div>
    );
    return view;
  },
  CTAButton: ({ data }) => {
    const view = (
      <div className="block-item block-filled">
        <div className="block-item-btn">
          <button>{data.label}</button>
        </div>
      </div>
    );
    return view;
  },
  Logo: ({ data }) => {
    console.log("logo data: ", data)
    const view = (
      <div className="block-item block-filled">
        <div className="block-item-logo">
          {data && data.image ? <img className="block-item-logo-img" src={data.image} /> : ""}
        </div>
      </div>
    );
    return view;
  },
};

export default Canvas;
