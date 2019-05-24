import React, { ChangeEvent, MouseEvent } from "react";
import "./styles.scss";
import ParentsIcon from "@/assets/icons/parents.svg";
import DnaIcon from "@/assets/icons/dna.svg";
import OverlayIcon from "@/assets/icons/hair.svg";
import ClothesIcon from "@/assets/icons/clothes.svg";
import IdCardIcon from "@/assets/icons/id-card.svg";
import { Switcher, Button, Range, Input, Title } from "@/components";

import {
  TFaceFeatures,
  TActiveGroup,
  THeadOverlays,
  THeadOverlay,
  THair,
  TColor,
  TParent,
  TMix
} from "./types";

interface TProps {
  activeGroup: TActiveGroup;
  faceFeatures: TFaceFeatures;
  headOverlays: THeadOverlays;
  firstName: string;
  lastName: string;
  sex: string;
  hair: THair;
  color: TColor;
  fathers: TParent;
  mothers: TParent;
  shapeMix: TMix;
  skinMix: TMix;
  onClickCreate: () => void;
  onClickCancel: () => void;
  onClickGroupButton: (value: TActiveGroup) => () => void;
  onClickHeadOverlay: (key: keyof THeadOverlays, step: 1 | -1) => () => void;
  onChangeFaceFeature: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSex: (value: "male" | "female") => () => void;
  onClickHair: (step: 1 | -1) => () => void;
  onClickColor: (step: 1 | -1) => () => void;
  onClickFather: (step: 1 | -1) => () => void;
  onClickMother: (step: 1 | -1) => () => void;
  onChangeShapeMix: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSkinMix: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface THeadOverlayProps {
  text: string;
  name: keyof THeadOverlays;
  handler: TProps["onClickHeadOverlay"];
  headOverlay: THeadOverlay;
}

function HeadOverlay(props: THeadOverlayProps) {
  return (
    <div className="lobby-create__input-block">
      <Switcher
        onClickPrevious={props.handler(props.name, -1)}
        onClickNext={props.handler(props.name, 1)}
      >
        {props.text}: <span>{props.headOverlay.current}</span>
      </Switcher>
    </div>
  );
}

function View(props: TProps) {
  return (
    <section className="lobby-create">
      <nav className="lobby-create__navigation">
        <div
          data-active={props.activeGroup === "id-card"}
          className="lobby-create__navigation-button"
          onClick={props.onClickGroupButton("id-card")}
        >
          <IdCardIcon />
        </div>

        <div
          data-active={props.activeGroup === "parents"}
          className="lobby-create__navigation-button"
          onClick={props.onClickGroupButton("parents")}
        >
          <ParentsIcon />
        </div>

        <div
          data-active={props.activeGroup === "dna"}
          className="lobby-create__navigation-button"
          onClick={props.onClickGroupButton("dna")}
        >
          <DnaIcon />
        </div>

        <div
          data-active={props.activeGroup === "overlay"}
          className="lobby-create__navigation-button"
          onClick={props.onClickGroupButton("overlay")}
        >
          <OverlayIcon />
        </div>

        <div
          data-active={props.activeGroup === "clothes"}
          className="lobby-create__navigation-button"
          onClick={props.onClickGroupButton("clothes")}
        >
          <ClothesIcon />
        </div>
      </nav>
      <div className="lobby-create__body">
        <div className="lobby-create__body-content">
          {props.activeGroup === "id-card" && (
            <>
              <div className="lobby-create__input-block">
                <div className="lobby-create__label">Имя</div>
                <Input
                  data-key="firstName"
                  value={props.firstName}
                  onChange={props.onChangeName}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">Фамилия</div>
                <Input
                  data-key="lastName"
                  value={props.lastName}
                  onChange={props.onChangeName}
                />
              </div>

              <div className="lobby-create__input-block">
                <Switcher
                  onClickPrevious={props.onClickSex("male")}
                  onClickNext={props.onClickSex("female")}
                >
                  Пол:{" "}
                  <span>{props.sex === "male" ? "Мужской" : "Женский"}</span>
                </Switcher>
              </div>
            </>
          )}

          {props.activeGroup === "parents" && (
            <>
              <div className="lobby-create__input-block">
                <Switcher
                  onClickPrevious={props.onClickFather(-1)}
                  onClickNext={props.onClickFather(1)}
                >
                  Отец:{" "}
                  <span>
                    {props.fathers.values[props.fathers.current].name}
                  </span>
                </Switcher>
              </div>

              <div className="lobby-create__input-block">
                <Switcher
                  onClickPrevious={props.onClickMother(-1)}
                  onClickNext={props.onClickMother(1)}
                >
                  Мать:{" "}
                  <span>
                    {props.mothers.values[props.mothers.current].name}
                  </span>
                </Switcher>
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">схожесть</div>
                <Range
                  step="any"
                  min={props.shapeMix.min}
                  max={props.shapeMix.max}
                  value={props.shapeMix.current}
                  onChange={props.onChangeShapeMix}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">цвет кожи</div>
                <Range
                  step="any"
                  min={props.skinMix.min}
                  max={props.skinMix.max}
                  value={props.skinMix.current}
                  onChange={props.onChangeSkinMix}
                />
              </div>
            </>
          )}

          {props.activeGroup === "dna" && (
            <>
              <Title>Нос</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина носа</div>
                <Range
                  step="any"
                  data-key="noseWidth"
                  min={props.faceFeatures.noseWidth.min}
                  max={props.faceFeatures.noseWidth.max}
                  value={props.faceFeatures.noseWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">noseHeight</div>
                <Range
                  step="any"
                  data-key="noseHeight"
                  min={props.faceFeatures.noseHeight.min}
                  max={props.faceFeatures.noseHeight.max}
                  value={props.faceFeatures.noseHeight.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">noseLength</div>
                <Range
                  step="any"
                  data-key="noseLength"
                  min={props.faceFeatures.noseLength.min}
                  max={props.faceFeatures.noseLength.max}
                  value={props.faceFeatures.noseLength.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">noseBridge</div>
                <Range
                  step="any"
                  data-key="noseBridge"
                  min={props.faceFeatures.noseBridge.min}
                  max={props.faceFeatures.noseBridge.max}
                  value={props.faceFeatures.noseBridge.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">noseTip</div>
                <Range
                  step="any"
                  data-key="noseTip"
                  min={props.faceFeatures.noseTip.min}
                  max={props.faceFeatures.noseTip.max}
                  value={props.faceFeatures.noseTip.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">noseBridgeShift</div>
                <Range
                  step="any"
                  data-key="noseBridgeShift"
                  min={props.faceFeatures.noseBridgeShift.min}
                  max={props.faceFeatures.noseBridgeShift.max}
                  value={props.faceFeatures.noseBridgeShift.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Брови</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">browHeight</div>
                <Range
                  step="any"
                  data-key="browHeight"
                  min={props.faceFeatures.browHeight.min}
                  max={props.faceFeatures.browHeight.max}
                  value={props.faceFeatures.browHeight.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">browWidth</div>
                <Range
                  step="any"
                  data-key="browWidth"
                  min={props.faceFeatures.browWidth.min}
                  max={props.faceFeatures.browWidth.max}
                  value={props.faceFeatures.browWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Скулы</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">cheekboneHeight</div>
                <Range
                  step="any"
                  data-key="cheekboneHeight"
                  min={props.faceFeatures.cheekboneHeight.min}
                  max={props.faceFeatures.cheekboneHeight.max}
                  value={props.faceFeatures.cheekboneHeight.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">cheeckboneWidth</div>
                <Range
                  step="any"
                  data-key="cheekboneWidth"
                  min={props.faceFeatures.cheekboneWidth.min}
                  max={props.faceFeatures.cheekboneWidth.max}
                  value={props.faceFeatures.cheekboneWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Щеки</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">cheeksWidth</div>
                <Range
                  step="any"
                  data-key="cheeksWidth"
                  min={props.faceFeatures.cheeksWidth.min}
                  max={props.faceFeatures.cheeksWidth.max}
                  value={props.faceFeatures.cheeksWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Глаза</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">eyes</div>
                <Range
                  step="any"
                  data-key="eyes"
                  min={props.faceFeatures.eyes.min}
                  max={props.faceFeatures.eyes.max}
                  value={props.faceFeatures.eyes.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Губы</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">lips</div>
                <Range
                  step="any"
                  data-key="lips"
                  min={props.faceFeatures.lips.min}
                  max={props.faceFeatures.lips.max}
                  value={props.faceFeatures.lips.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Челюсти</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">jawWidth</div>
                <Range
                  step="any"
                  data-key="jawWidth"
                  min={props.faceFeatures.jawWidth.min}
                  max={props.faceFeatures.jawWidth.max}
                  value={props.faceFeatures.jawWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">jawHeight</div>
                <Range
                  step="any"
                  data-key="jawHeight"
                  min={props.faceFeatures.jawHeight.min}
                  max={props.faceFeatures.jawHeight.max}
                  value={props.faceFeatures.jawHeight.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Подбородок</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">chinLength</div>
                <Range
                  step="any"
                  data-key="chinLength"
                  min={props.faceFeatures.chinLength.min}
                  max={props.faceFeatures.chinLength.max}
                  value={props.faceFeatures.chinLength.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">chinPosition</div>
                <Range
                  step="any"
                  data-key="chinPosition"
                  min={props.faceFeatures.chinPosition.min}
                  max={props.faceFeatures.chinPosition.max}
                  value={props.faceFeatures.chinPosition.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">chinWidth</div>
                <Range
                  step="any"
                  data-key="chinWidth"
                  min={props.faceFeatures.chinWidth.min}
                  max={props.faceFeatures.chinWidth.max}
                  value={props.faceFeatures.chinWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">chinShape</div>
                <Range
                  step="any"
                  data-key="chinShape"
                  min={props.faceFeatures.chinShape.min}
                  max={props.faceFeatures.chinShape.max}
                  value={props.faceFeatures.chinShape.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>

              <Title>Шея</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">neckWidth</div>
                <Range
                  step="any"
                  data-key="neckWidth"
                  min={props.faceFeatures.neckWidth.min}
                  max={props.faceFeatures.neckWidth.max}
                  value={props.faceFeatures.neckWidth.current}
                  onChange={props.onChangeFaceFeature}
                />
              </div>
            </>
          )}
          {props.activeGroup === "overlay" && (
            <>
              <div className="lobby-create__input-block">
                <Switcher
                  onClickPrevious={props.onClickHair(-1)}
                  onClickNext={props.onClickHair(1)}
                >
                  Hair: <span>{props.hair.current}</span>
                </Switcher>
              </div>

              <div className="lobby-create__input-block">
                <Switcher
                  onClickPrevious={props.onClickColor(-1)}
                  onClickNext={props.onClickColor(1)}
                >
                  Color: <span>{props.color.current}</span>
                </Switcher>
              </div>

              <HeadOverlay
                name="blemishes"
                text="blemishes"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.blemishes}
              />

              <HeadOverlay
                name="facialHair"
                text="facialHair"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.facialHair}
              />

              <HeadOverlay
                name="eyebrows"
                text="eyebrows"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.eyebrows}
              />

              <HeadOverlay
                name="ageing"
                text="ageing"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.ageing}
              />

              <HeadOverlay
                name="makeup"
                text="makeup"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.makeup}
              />

              <HeadOverlay
                name="blush"
                text="blush"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.blush}
              />

              <HeadOverlay
                name="complexion"
                text="complexion"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.complexion}
              />

              <HeadOverlay
                name="sunDamage"
                text="sunDamage"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.sunDamage}
              />

              <HeadOverlay
                name="lipstick"
                text="lipstick"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.lipstick}
              />

              <HeadOverlay
                name="molesFreckles"
                text="molesFreckles"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.molesFreckles}
              />

              <HeadOverlay
                name="chestHair"
                text="chestHair"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.chestHair}
              />

              <HeadOverlay
                name="bodyBlemishes"
                text="bodyBlemishes"
                handler={props.onClickHeadOverlay}
                headOverlay={props.headOverlays.bodyBlemishes}
              />
            </>
          )}
          {props.activeGroup === "clothes" && <>Clothes</>}
        </div>

        <div className="lobby-create__body-buttons">
          <Button data-wide onClick={props.onClickCreate}>
            Создать
          </Button>
          <Button data-wide onClick={props.onClickCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </section>
  );
}

export { View, TActiveGroup };
