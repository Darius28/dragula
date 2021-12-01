import { createContext, useState, useEffect } from "react";
import EditBlock from "../components/EditBlock/EditBlock";

export const Context = createContext({
  layers: [],
  addLayer: (addObj) => {},
  removeOldPosnLayer: (oldIndex) => {},
  addBlockItem: (blockItemObj) => {},
});

const Provider = (props) => {
  const [layers, setLayers] = useState([]);

  const addLayerHandler = ({ posn, type, data }) => {
    console.log("addLayer cols: ", posn, type, data);
    setLayers((prevState) => {
      prevState.splice(posn, 0, {
        id: type,
        data,
      });
      return prevState;
    });
  };

  const removeOldPosnLayerHandler = (oldIndex) => {
    setLayers((prevState) => {
      prevState.splice(oldIndex, 1);
      return prevState;
    });
  };

  const addBlockItemHandler = (blockObj) => {
    console.log(blockObj);
    setLayers((prevState) => {
      prevState[+blockObj.row].data[+blockObj.col] = {
        id: blockObj.type,
        data: EditBlock.GetPreset(blockObj.type),
      };
      return prevState;
    });
  };

  const providerObj = {
    layers,
    addLayer: addLayerHandler,
    removeOldPosnLayer: removeOldPosnLayerHandler,
    addBlockItem: addBlockItemHandler,
  };

  return (
    <Context.Provider
      value={{
        providerObj,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
