import type { NextPage } from "next";
import "./App.module.css";
import "../node_modules/dragula/dist/dragula.min.css";
import AppCanvas from "../components/AppComponents/AppCanvas";
import AppPalette from "../components/AppComponents/AppPalette";
var dragula = require("react-dragula");
import { Context } from "../context/index";
import React, { useContext, useEffect, useState } from "react";

// process.browser????
const Home: NextPage = () => {
  const {
    providerObj: { layers, addLayer, removeOldPosnLayer, addBlockItem },
  } = useContext(Context);
  const [newLayer, setNewLayer] = useState<{
    posn: null | number;
    type: null | string;
    oldIndex: null | number;
  }>({
    posn: null,
    type: null,
    oldIndex: null,
  });
  const [blockItem, setBlockItem] = useState<{
    row: null | string;
    col: null | string;
    type: null | string;
  }>({
    row: null,
    col: null,
    type: null,
  });
  // WHATS THE TYPE HERE?????
  const [hotPanListener, setHotPanListener] = useState<any>();
  useEffect(() => {
    if (process.browser) {
      const paletteDomContainer = document.querySelector("palette-container");
      console.log("paletteDomContainer: ", paletteDomContainer);
      const canvasDomContainer: null | HTMLElement =
        document.getElementById("canvas-dom");
      dragula([paletteDomContainer, canvasDomContainer], {
        copy: (el: HTMLElement, source: HTMLElement) => {
          return source === paletteDomContainer;
        },
        accepts: (el: HTMLElement, target: HTMLElement) => {
          return target === canvasDomContainer;
        },
      })
        .on("drag", (el: HTMLElement) => {
          if (el.classList.contains("canvas-item")) {
            console.log("true");
            el.classList.add("moving");
          }
        })
        .on("drop", (el: HTMLElement) => {
          console.log("drop");
          // number | null not working
          let newRowIndex: number | null = null;
          let oldIndex: number | null = null;
          const droppedElement = el;
          const droppedElementCols = droppedElement.classList[0];
          console.log("droppedElementCols: ", droppedElementCols);

          // Shows array of NodeList in normal reactJS app
          const elList: NodeList  =
            canvasDomContainer.querySelectorAll(".item-layer");
          for (let i = 0; i < elList.length; i++) {
            const el: HTMLElement = elList[i];

            if (droppedElement.getAttribute("id") === el.getAttribute("id")) {
              newRowIndex = i;
            }
            if (el.classList.contains("moving")) {
              const elId: string | null = el.getAttribute("id");
              oldIndex = +elId.replace("row-", "");
              break;
            }
          }
          if (newRowIndex !== null) {
            console.log("newRowIndex: ", newRowIndex);
            setNewLayer({
              posn: newRowIndex,
              type: droppedElementCols,
              oldIndex,
            });
          }
        })
        .on("dragend", (el: HTMLElement) => {
          console.log("dragend");
          if (!el.classList.contains("moving")) {
            el.remove();
          }
          el.classList.remove("moving");
        });
    }
  }, []);

  useEffect(() => {
    let data: any = [];
    if (newLayer.type) {
      console.log("newLayer: ", newLayer);
      if (newLayer.oldIndex !== null) {
        console.log("datatype removeposn: ", newLayer.oldIndex);
        removeOldPosnLayer(newLayer.oldIndex);
      }
      console.log("addLayer Datatypes: ", newLayer.posn, newLayer.type, data);
      addLayer({
        posn: newLayer.posn,
        type: newLayer.type,
        data,
      });
      setNewLayer({
        posn: null,
        type: null,
        oldIndex: null,
      });
      console.log("about to exec rhp");
      setTimeout(() => resetHotPans());
      console.log("reset hot pans done");
      // why resetHotPans????
    }
  }, [newLayer, addLayer]);

  useEffect(() => {
    console.log("blockItem UE", blockItem);
    console.log("blockItem.type: ", blockItem.type);
    if (blockItem.type) {
      console.log("BLOCK ITEM TYPE !!!!!!!!!!: ", blockItem);
      addBlockItem(blockItem);
      // this is crashing the app, how do I set this to null??
      // setBlockItem({ row: null, col: null, type: null });
    }
  }, [blockItem]);

  function resetHotPans() {
    console.log("in rhp");
    if (process.browser) {
      const paletteItemsDomContainer = document.querySelector(".palette-items");
      console.log("palette items: ", paletteItemsDomContainer);
      const hotPan: NodeList = document.querySelectorAll(".hot-pan");
      console.log("hot pan: ", hotPan, paletteItemsDomContainer);

      if (hotPanListener) {
        hotPanListener.destroy();
      }

      const listener = dragula([paletteItemsDomContainer, ...hotPan], {
        removeOnSpill: false,
        revertOnSpill: true,
        copy: (el: HTMLElement, source: HTMLElement) => {
          return source === paletteItemsDomContainer;
        },
        accepts: (el: HTMLElement, target: HTMLElement) => {
          return (
            !target.classList.contains("filled") &&
            !el.classList.contains("block-filled")
          );
        },
        moves: (el: HTMLElement, target: HTMLElement, handle: HTMLElement) => {
          console.log("moves handle: ", handle);
          return handle.classList.contains("pal-component-item");
        },
      })
        .on("drag", (el: HTMLElement) => {
          el.classList.add("move");
        })
        .on("drop", (el: HTMLElement, target: HTMLElement) => {
          if (target) {
            console.log("in target: ", el.id);
            const pos = target.id.split("-");
            setBlockItem({ row: pos[1], col: pos[2], type: el.id });
          }
        })
        .on("dragend", (el: HTMLElement) => {
          if (!el.classList.contains("block-item")) {
            el.remove();
          }
        });
      setHotPanListener(listener);
    }
  }

  const showLayersArray = () => {
    console.log("layers: ", layers);
  };

  const view = (
    <div className="App">
      <AppCanvas />
      <AppPalette />
      <button onClick={showLayersArray}>Show Layers Array</button>
    </div>
  );
  return view;
};

export default Home;
