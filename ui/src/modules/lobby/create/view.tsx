import React, { ChangeEvent } from "react";
import "./styles.scss";
import ParentsIcon from "@/assets/icons/parents.svg";
import DnaIcon from "@/assets/icons/dna.svg";
import HairIcon from "@/assets/icons/hair.svg";
import ClothesIcon from "@/assets/icons/clothes.svg";
import IdCardIcon from "@/assets/icons/id-card.svg";
import { Switcher, Button, Range, Input, Title } from "@/components";
import { TFaceFeatures, TActiveGroup } from "./types";

interface TProps {
  activeGroup: TActiveGroup;
  faceFeatures: TFaceFeatures;
  onClickCreate: () => void;
  onClickCancel: () => void;
  onClickGroupButton: (value: TActiveGroup) => () => void;
  onChangeFaceFeature: (event: ChangeEvent<HTMLInputElement>) => void;
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
          data-active={props.activeGroup === "hair"}
          className="lobby-create__navigation-button"
          onClick={props.onClickGroupButton("hair")}
        >
          <HairIcon />
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
                <Input />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">Фамилия</div>
                <Input />
              </div>

              <div className="lobby-create__input-block">
                <Switcher onClickPrevious={() => {}} onClickNext={() => {}}>
                  Пол: <span>Мужской</span>
                </Switcher>
              </div>
            </>
          )}
          {props.activeGroup === "parents" && <>Parents</>}
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
                  data-key="cheeckboneWidth"
                  min={props.faceFeatures.cheeckboneWidth.min}
                  max={props.faceFeatures.cheeckboneWidth.max}
                  value={props.faceFeatures.cheeckboneWidth.current}
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
          {props.activeGroup === "hair" && <>Hair</>}
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
