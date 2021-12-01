import "./App.css";
import "../node_modules/dragula/dist/dragula.min.css";
import { Context } from "./context";
import { useContext, useState, useEffect } from "react";
import Palette from "./components/Palette/Palette";
import Canvas from "./components/Canvas/Canvas";
var dragula = require("react-dragula");

const App = {
  Index: () => {
    const {
      providerObj: { layers, addLayer, removeOldPosnLayer, addBlockItem },
    } = useContext(Context);
    const [newLayer, setNewLayer] = useState({
      posn: null,
      type: null,
      oldIndex: null,
    });
    const [blockItem, setBlockItem] = useState({
      row: null,
      col: null,
      type: null,
    });
    useEffect(() => {
      const paletteDomContainer = document.querySelector(".palette-container");
      console.log("paletteDomCOntainer: ", paletteDomContainer);
      const canvasDomContainer = document.getElementById("canvas-dom");
      dragula([paletteDomContainer, canvasDomContainer], {
        copy: (el, source) => {
          return source === paletteDomContainer;
        },
        accepts: (el, target) => {
          return target === canvasDomContainer;
        },
      })
        .on("drag", (el) => {
          if (el.classList.contains("canvas-item")) {
            console.log("true");
            el.classList.add("moving");
          }
        })
        .on("drop", (el) => {
          console.log("drop");
          let newRowIndex = null;
          let oldIndex = null;
          const droppedElement = el;
          const droppedElementCols = droppedElement.classList[0];
          console.log("droppedElementCols: ", droppedElementCols);
          const elList = canvasDomContainer.querySelectorAll(".item-layer");
          console.log("list: ", elList);
          for (let i = 0; i < elList.length; i++) {
            const el = elList[i];
            if (droppedElement.getAttribute("id") === el.getAttribute("id")) {
              newRowIndex = i;
            }
            if (el.classList.contains("moving")) {
              const elId = el.getAttribute("id");
              oldIndex = +elId.replace("row-", "");
              break;
            }
          }
          if (newRowIndex > -1) {
            console.log("newRowIndex: ", newRowIndex);
            setNewLayer({
              posn: newRowIndex,
              type: droppedElementCols,
              oldIndex,
            });
          }
        })
        .on("dragend", (el) => {
          console.log("dragend");
          if (!el.classList.contains("moving")) {
            el.remove();
          }
          el.classList.remove("moving");
        });
    }, []);

    useEffect(() => {
      let data = [];
      if (newLayer.type) {
        console.log("newLayer: ", newLayer);
        if (newLayer.oldIndex !== null) {
          removeOldPosnLayer(newLayer.oldIndex);
        }
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
        addBlockItem(blockItem);
        setBlockItem({ row: null, col: null, type: null });
      }
    }, [blockItem]);

    function resetHotPans() {
      console.log("in rhp");
      const paletteItemsDomContainer = document.querySelector(".palette-items");
      console.log("palette items: ", paletteItemsDomContainer);
      const hotPan = document.querySelectorAll(".hot-pan");
      console.log("hot pan: ", hotPan, paletteItemsDomContainer);
      dragula([paletteItemsDomContainer, ...hotPan], {
        removeOnSpill: false,
        revertOnSpill: true,
        copy: (el, target) => {
          return true;
        },
        accepts: (el, target) => {
          return true;
        },
        moves: (el, target, handle) => {
          return true;
        },
      })
        .on("drag", (el) => {
          el.classList.add("move");
        })
        .on("drop", (el, target) => {
          if (target) {
            console.log("in target: ", el.id);
            const pos = target.id.split("-");
            setBlockItem({ row: pos[1], col: pos[2], type: el.id });
          }
        })
        .on("dragend", (el) => {
          // if (!el.classList.contains("block-item")) {
          //   el.remove();
          // }
        });
    }

    const showLayersArray = () => {
      console.log("layers: ", layers);
    };

    const view = (
      <div className="App">
        <App.Canvas />
        <App.Palette />
        <button onClick={showLayersArray}>Show Layers Array</button>
      </div>
    );
    return view;
  },
  Palette: () => {
    const view = (
      <div id="palette-dom">
        <Palette.Index />
      </div>
    );
    return view;
  },
  Canvas: () => {
    const view = (
      <div id="canvas-dom">
        <Canvas.Index />
      </div>
    );
    return view;
  },
};

export default App;
