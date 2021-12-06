import React from "react";
import { ITEMS_DATA } from "../Data/Data";

const EditBlock = {
  GetPreset: (type) => {
    let data = {};
    switch (type) {
      case ITEMS_DATA.LOGO:
        data = {
          image:
            "https://th.bing.com/th/id/Rf9b5bc2fc93bb0800ac871115ac95f8d?rik=imzK0xsJn3MlhA&pid=ImgRaw",
        };
        break;
      case ITEMS_DATA.CTA_BUTTON:
        data = {
          label: "CTA Button",
        };
        break;
    }
    return data;
  },
};

export default EditBlock;
