export interface TFaceFeature {
  min: number;
  max: number;
  current: number;
}

export interface THeadOverlay {
  values: number[];
  current: number;
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

export type TCustomizeType = "face-feature" | "head-overlay" | "sex";

export type TCustomizeKey =
  | keyof TFaceFeatures
  | keyof THeadOverlays
  | "male"
  | "female";

export interface TOnInitOkPayload {
  faceFeatures: TFaceFeatures;
  sex: string;
  headOverlays: THeadOverlays;
}
