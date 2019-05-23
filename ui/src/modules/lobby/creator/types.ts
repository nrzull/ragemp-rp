export interface TFaceFeature {
  min: number;
  max: number;
  current: number;
}

export interface THeadOverlay {
  values: number[];
  current: number;
}

export interface TSex {
  current: "male" | "female";
}

export interface TName {
  current: string;
}

export interface THeadOverlays {
  blemishes: THeadOverlay;
  facialHair: THeadOverlay;
  eyebrows: THeadOverlay;
  ageing: THeadOverlay;
  makeup: THeadOverlay;
  blush: THeadOverlay;
  complexion: THeadOverlay;
  sunDamage: THeadOverlay;
  lipstick: THeadOverlay;
  molesFreckles: THeadOverlay;
  chestHair: THeadOverlay;
  bodyBlemishes: THeadOverlay;
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

export type TActiveGroup =
  | "id-card"
  | "parents"
  | "dna"
  | "overlay"
  | "clothes";

export type TCustomizeType = "face-feature" | "head-overlay";
export type TCustomizeKey = keyof TFaceFeatures | keyof THeadOverlays;

export interface TOnInitOkPayload {
  faceFeatures: TFaceFeatures;
  sex: TSex;
  firstName: TName;
  lastName: TName;
  headOverlays: THeadOverlays;
}
