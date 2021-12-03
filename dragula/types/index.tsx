export type LayerInner = {
  id: string;
  data: any[];
};

export type Layer = {
  // doesn't take 'string', but takes 'String'???
  id: String;
  data: LayerInner[];
};

export type AddObj = {
  posn: number;
  type: String;
  data: any[];
};

export type blockItemObj = {
  row: string;
  col: string;
  type: string;
};

export type ContextObj = {
  layers: Layer[];
  addLayer: (addObj: AddObj) => void;
  removeOldPosnLayer: (oldIndex: number) => void;
  addBlockItem: (blockItem: blockItemObj) => void;
};

export type CTAButtonType = {
    label: string
}

export type ImageType = {
    image: string
}
