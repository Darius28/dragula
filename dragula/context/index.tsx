import React, { createContext, useState, useEffect } from "react";
import EditBlock from "../components/EditBlock/EditBlock";

type LayerInner = {
  id: string;
  data: any;
};

type Layer = {
  // doesnt take 'string', but takes 'String'???
  id: String;
  data: LayerInner[];
};

type AddObj = {
  posn: number;
  type: String;
  data: any[];
};

type blockItemObj = {
  row: string;
  col: string;
  type: string;
};

type ContextObj = {
  layers: Layer[];
  addLayer: (addObj: AddObj) => void;
  removeOldPosnLayer: (oldIndex: number) => void;
  addBlockItem: (blockItem: blockItemObj) => void;
};

export const Context = createContext<ContextObj>({
  layers: [],
  addLayer: (addObj) => {},
  removeOldPosnLayer: (oldIndex) => {},
  addBlockItem: (blockItem) => {},
});

const Provider: React.FC = (props) => {
  const [layers, setLayers] = useState<Layer[]>([]);

  const addLayerHandler = (addObj: AddObj) => {
    console.log("addLayer cols: ", addObj.posn, addObj.type, addObj.data);
    setLayers((prevState) => {
      prevState.splice(addObj.posn, 0, {
        id: addObj.type,
        data: addObj.data,
      });
      return prevState;
    });
  };

  const removeOldPosnLayerHandler = (oldIndex: number) => {
    setLayers((prevState) => {
      prevState.splice(oldIndex, 1);
      return prevState;
    });
  };

  const addBlockItemHandler = (blockObj: blockItemObj) => {
    console.log(blockObj);
    setLayers((prevState) => {
      prevState[+blockObj.row].data[+blockObj.col] = {
        id: blockObj.type,
        data: EditBlock.GetPreset(blockObj.type),
      };
      return prevState;
    });
  };

  const providerObj: ContextObj = {
    layers,
    addLayer: addLayerHandler,
    removeOldPosnLayer: removeOldPosnLayerHandler,
    addBlockItem: addBlockItemHandler,
  };

  return (
    <Context.Provider value={providerObj}>{props.children}</Context.Provider>
  );
};

export default Provider;
