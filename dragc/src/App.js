import "../node_modules/dragula/dist/dragula.min.css";
import "./App.css";
import { useEffect, useState } from "react";
var dragula = require("react-dragula");

function App() {
  const [newLayer, setNewLayer] = useState({
    newIndex: null,
    type: null,
    divColor: null,
  });
  const [totalStack, setTotalStack] = useState([]);

  useEffect(() => {
    const destinationContainer = document.querySelector(".item-destination");
    const sourceContainer = document.querySelector(".item-source");
    dragula([destinationContainer, sourceContainer], {
      copy: function (el, source) {
        return source === sourceContainer;
      },
      removeOnSpill: false,
      revertOnSpill: true,
      accepts: function (el, target) {
        return target === destinationContainer;
      },
    })
      .on("drag", (el) => {
        console.log("dragged element classList: ", el.classList);
      })
      .on("drop", (el) => {
        let newIndex = null;
        const elements = destinationContainer.querySelectorAll(".outcon");
        // console.log("elements: ", elements)
        const droppedElement = el;
        const droppedElementId = droppedElement.getAttribute("id");
        for (let i = 0; i < elements.length; i++) {
          const eachElement = elements[i];
          // console.log("eachElement: ", eachElement);
          console.log(
            "eachElement.getAttribute('id'): ",
            eachElement.getAttribute("id")
          );
          if (droppedElementId === eachElement.getAttribute("id")) {
            newIndex = i;
            // setNewLayer({
            //   newIndex,
            //   type: droppedElementId,
            //   divColor: droppedElementId.substr(6, 5),
            // });
            break;
          }
        }
        if (newIndex > -1) {
          setNewLayer({
            newIndex,
            type: droppedElementId,
            divColor: droppedElementId.substr(6, 5),
          });
        }
      })
      .on("dragend", (el) => {
        console.log("dragend el: ", el);
        el.remove();
      });
  }, []);

  useEffect(() => {
    console.log("totalStack: ", totalStack);
    if (newLayer.type) {
      console.log("newLayer: ", newLayer);
      setTotalStack((prevState) => {
        console.log(prevState);
        return [...prevState, newLayer];
      });
      setNewLayer({
        newIndex: null,
        type: null,
        divColor: null,
      });
    }
  }, [newLayer.type]);

  useEffect(() => {}, [totalStack]);

  const showListHandler = () => {
    console.log(totalStack);
  };

  console.log(totalStack.length);
  console.log(totalStack);

  return (
    <div id="App">
      <div className="item-destination">
        {totalStack.length > 0 &&
          totalStack.map((item, index) => {
            // console.log("totalStack params: ", item)
            return (
              <div id={`row-${index}`} className="outer-border">
                <div className={`cont ${item.divColor}`}></div>
              </div>
            );
          })}
      </div>
      <div className="item-source">
        <div id="layer-red" className="outcon r">
          <div className="red cont src-red"></div>
        </div>
        <div id="layer-blue" className="outcon b">
          <div className="blue cont src-blue"></div>
        </div>
        <div id="layer-green" className="outcon g">
          <div className="green cont src-green"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
