import React, { useContext, useLayoutEffect } from "react";
import { Context } from "../../context";
import "./Canvas.css";

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
    }
  },
  SingleCol: ({ row, data }) => {
    const view = (
      <div
        className="pal-col-1 item-layer canvas-single canvas-item"
        id={`row-${row}`}
      >
        <div className="hot-pan" id={`block-${row}-0`}>
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
        <div className="hot-pan" id={`block-${row}-0`}>
          <Canvas.GetElement row={row} data={data[0]} />
        </div>
        <div className="hot-pan" id={`block-${row}-1`}>
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
        <div className="hot-pan" id={`block-${row}-0`}>
          <Canvas.GetElement row={row} data={data[0]} />
        </div>
        <div className="hot-pan" id={`block-${row}-1`}>
          <Canvas.GetElement row={row} data={data[1]} />
        </div>
        <div className="hot-pan" id={`block-${row}-2`}>
          <Canvas.GetElement row={row} data={data[2]} />
        </div>
      </div>
    );
    return view;
  },
};

export default Canvas;
