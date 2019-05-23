export interface TFaceFeature {
  min: number;
  max: number;
  current: number;
}

export interface TFaceFeatures {
  noseWidth: TFaceFeature;
  noseHeight: TFaceFeature;
  noseLength: TFaceFeature;
  noseBridge: TFaceFeature;
  noseTip: TFaceFeature;
  noseBridgeShift: TFaceFeature;
  browHeight: TFaceFeature;
  browWidth: TFaceFeature;
  cheekboneHeight: TFaceFeature;
  cheeckboneWidth: TFaceFeature;
  cheeksWidth: TFaceFeature;
  eyes: TFaceFeature;
  lips: TFaceFeature;
  jawWidth: TFaceFeature;
  jawHeight: TFaceFeature;
  chinLength: TFaceFeature;
  chinPosition: TFaceFeature;
  chinWidth: TFaceFeature;
  chinShape: TFaceFeature;
  neckWidth: TFaceFeature;
}

export type TActiveGroup = "id-card" | "parents" | "dna" | "hair" | "clothes";

export type TCustomizeType = "face-feature";
export type TCustomizeKey = keyof TFaceFeatures;

export type TSex = "male" | "female";
