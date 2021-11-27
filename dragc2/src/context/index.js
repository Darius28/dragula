import { createContext, useState, useEffect } from "react";

export const Context = createContext({
  layers: [],
  addLayer: (addObj) => {},
  removeOldPosnLayer: (oldIndex) => {},
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

  const providerObj = {
    layers,
    addLayer: addLayerHandler,
    removeOldPosnLayer: removeOldPosnLayerHandler,
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
