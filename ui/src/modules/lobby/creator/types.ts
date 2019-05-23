export interface TFaceFeature {
  min: number;
  max: number;
  current: number;
}

export interface TSex {
  current: "male" | "female";
}

export interface TName {
  current: string;
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
  cheekboneWidth: TFaceFeature;
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

export interface TOnInitOkPayload {
  faceFeatures: TFaceFeatures;
  sex: TSex;
  firstName: TName;
  lastName: TName;
}
