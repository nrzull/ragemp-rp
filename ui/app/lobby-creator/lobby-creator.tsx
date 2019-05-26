import React, { Component, ChangeEvent } from "react";
import "./styles.scss";

import {
  TOnInitOkPayload,
  TFaceFeatures,
  TActiveGroup,
  THeadOverlays,
  THeadOverlay
} from "./types";

import ParentsIcon from "@assets/icons/parents.svg";
import DnaIcon from "@assets/icons/dna.svg";
import OverlayIcon from "@assets/icons/hair.svg";
import ClothesIcon from "@assets/icons/clothes.svg";
import IdCardIcon from "@assets/icons/id-card.svg";
import { Switcher, Button, Range, Input, Title } from "@components";

import * as service from "./service";
import * as bus from "@app/bus";
import * as events from "@app/events";

interface TState extends TOnInitOkPayload {
  activeGroup: TActiveGroup;
  init: boolean;
  firstName: string;
  lastName: string;
  loading: boolean;
}

interface THeadOverlayProps {
  text: string;
  name: keyof THeadOverlays;
  handler: (key: keyof THeadOverlays, step: 1 | -1) => () => void;
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

class LobbyCreator extends Component<any, TState> {
  constructor(p) {
    super(p);

    this.state = {
      init: false,
      loading: true,
      firstName: "",
      lastName: "",
      activeGroup: "id-card"
    } as TState;
  }

  componentWillMount() {
    bus.on(events.LOBBY_CREATOR_INIT_OK, this.onInit);
  }

  componentWillUnmount() {
    bus.off(events.LOBBY_CREATOR_INIT_OK, this.onInit);
  }

  onInit = (payload: TOnInitOkPayload) => {
    if (!this.setState) return;
    this.setState({
      ...payload,
      loading: false,
      init: true,
      sex: payload.sex || this.state.sex
    });
  };

  componentDidMount() {
    service.init();
  }

  onClickCreate = () => {
    this.setState({ loading: true }, () => {
      service.submit({
        firstName: this.state.firstName,
        lastName: this.state.lastName
      });
    });
  };

  onClickCancel = () => {
    service.cancel();
  };

  onChangeFaceFeature = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.getAttribute(
      "data-key"
    ) as keyof TFaceFeatures;

    const value = +event.currentTarget.value;
    const faceFeature = this.state.faceFeatures[key];

    this.setState(
      {
        faceFeatures: {
          ...this.state.faceFeatures,
          [key]: {
            ...faceFeature,
            current: value
          }
        }
      },
      () => {
        service.customize("face-feature", key, value);
      }
    );
  };

  onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    const value = event.currentTarget.value;

    switch (key) {
      case "firstName":
        return this.setState({
          firstName: value
        });

      case "lastName":
        return this.setState({
          lastName: value
        });
    }
  };

  onClickGroupButton = (value: TActiveGroup) => () => {
    this.setState({ activeGroup: value });
  };

  onClickHeadOverlay = (key: keyof THeadOverlays, step: 1 | -1) => () => {
    const headOverlay = this.state.headOverlays[key];
    const nextCurrent = headOverlay.current + step;
    const nextValue = headOverlay.values[nextCurrent];

    if (typeof nextValue !== "number") return;

    this.setState(
      {
        headOverlays: {
          ...this.state.headOverlays,
          [key]: { ...headOverlay, current: nextCurrent }
        }
      },
      () => {
        service.customize("head-overlay", key, nextCurrent);
      }
    );
  };

  onClickSex = (sex: "male" | "female") => () => {
    if (sex === this.state.sex) return;

    this.setState({ sex }, () => {
      service.customize("sex", null, sex);
    });
  };

  onClickHair = (step: 1 | -1) => () => {
    const nextCurrent = this.state.hair.current + step;
    const nextValue = this.state.hair.values[nextCurrent];
    if (typeof nextValue !== "number") return;

    this.setState(
      { hair: { ...this.state.hair, current: nextCurrent } },
      () => {
        service.customize("hair", null, nextCurrent);
      }
    );
  };

  onClickColor = (step: 1 | -1) => () => {
    const nextCurrent = this.state.color.current + step;
    const nextValue = this.state.color.values[nextCurrent];
    if (typeof nextValue !== "number") return;

    this.setState(
      { color: { ...this.state.color, current: nextCurrent } },
      () => {
        service.customize("color", null, nextCurrent);
      }
    );
  };

  onClickFather = (step: 1 | -1) => () => {
    const nextCurrent = this.state.fathers.current + step;
    const nextValue = this.state.fathers.values[nextCurrent];

    if (!nextValue) return;

    this.setState(
      { fathers: { ...this.state.fathers, current: nextCurrent } },
      () => {
        service.customize("father", null, nextCurrent);
      }
    );
  };

  onClickMother = (step: 1 | -1) => () => {
    const nextCurrent = this.state.mothers.current + step;
    const nextValue = this.state.mothers.values[nextCurrent];

    if (!nextValue) return;

    this.setState(
      { mothers: { ...this.state.mothers, current: nextCurrent } },
      () => {
        service.customize("mother", null, nextCurrent);
      }
    );
  };

  onChangeSkinMix = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    this.setState(
      { skinMix: { ...this.state.skinMix, current: value } },
      () => {
        service.customize("skin-mix", null, value);
      }
    );
  };

  onChangeShapeMix = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    this.setState(
      { shapeMix: { ...this.state.shapeMix, current: value } },
      () => {
        service.customize("shape-mix", null, value);
      }
    );
  };

  onClickEyeColor = (step: 1 | -1) => () => {
    const nextCurrent = this.state.eyeColor.current + step;
    const nextValue = this.state.eyeColor.values[nextCurrent];
    if (typeof nextValue !== "number") return;

    this.setState(
      { eyeColor: { ...this.state.eyeColor, current: nextCurrent } },
      () => {
        service.customize("eye-color", null, nextCurrent);
      }
    );
  };

  render() {
    if (!this.state.init) return <></>;

    return (
      <section className="lobby-create">
        <nav className="lobby-create__navigation">
          <div
            data-active={this.state.activeGroup === "id-card"}
            className="lobby-create__navigation-button"
            onClick={this.onClickGroupButton("id-card")}
          >
            <IdCardIcon />
          </div>

          <div
            data-active={this.state.activeGroup === "parents"}
            className="lobby-create__navigation-button"
            onClick={this.onClickGroupButton("parents")}
          >
            <ParentsIcon />
          </div>

          <div
            data-active={this.state.activeGroup === "dna"}
            className="lobby-create__navigation-button"
            onClick={this.onClickGroupButton("dna")}
          >
            <DnaIcon />
          </div>

          <div
            data-active={this.state.activeGroup === "overlay"}
            className="lobby-create__navigation-button"
            onClick={this.onClickGroupButton("overlay")}
          >
            <OverlayIcon />
          </div>

          <div
            data-active={this.state.activeGroup === "clothes"}
            className="lobby-create__navigation-button"
            onClick={this.onClickGroupButton("clothes")}
          >
            <ClothesIcon />
          </div>
        </nav>
        <div className="lobby-create__body">
          <div className="lobby-create__body-content">
            {this.state.activeGroup === "id-card" && (
              <>
                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">Имя</div>
                  <Input
                    data-key="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeName}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">Фамилия</div>
                  <Input
                    data-key="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeName}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <Switcher
                    onClickPrevious={this.onClickSex("male")}
                    onClickNext={this.onClickSex("female")}
                  >
                    Пол:{" "}
                    <span>
                      {this.state.sex === "male" ? "Мужской" : "Женский"}
                    </span>
                  </Switcher>
                </div>
              </>
            )}

            {this.state.activeGroup === "parents" && (
              <>
                <div className="lobby-create__input-block">
                  <Switcher
                    onClickPrevious={this.onClickFather(-1)}
                    onClickNext={this.onClickFather(1)}
                  >
                    Отец:{" "}
                    <span>
                      {
                        this.state.fathers.values[this.state.fathers.current]
                          .name
                      }
                    </span>
                  </Switcher>
                </div>

                <div className="lobby-create__input-block">
                  <Switcher
                    onClickPrevious={this.onClickMother(-1)}
                    onClickNext={this.onClickMother(1)}
                  >
                    Мать:{" "}
                    <span>
                      {
                        this.state.mothers.values[this.state.mothers.current]
                          .name
                      }
                    </span>
                  </Switcher>
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">схожесть</div>
                  <Range
                    step="any"
                    min={this.state.shapeMix.min}
                    max={this.state.shapeMix.max}
                    value={this.state.shapeMix.current}
                    onChange={this.onChangeShapeMix}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">цвет кожи</div>
                  <Range
                    step="any"
                    min={this.state.skinMix.min}
                    max={this.state.skinMix.max}
                    value={this.state.skinMix.current}
                    onChange={this.onChangeSkinMix}
                  />
                </div>
              </>
            )}

            {this.state.activeGroup === "dna" && (
              <>
                <Title>Нос</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">ширина носа</div>
                  <Range
                    step="any"
                    data-key="noseWidth"
                    min={this.state.faceFeatures.noseWidth.min}
                    max={this.state.faceFeatures.noseWidth.max}
                    value={this.state.faceFeatures.noseWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">noseHeight</div>
                  <Range
                    step="any"
                    data-key="noseHeight"
                    min={this.state.faceFeatures.noseHeight.min}
                    max={this.state.faceFeatures.noseHeight.max}
                    value={this.state.faceFeatures.noseHeight.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">noseLength</div>
                  <Range
                    step="any"
                    data-key="noseLength"
                    min={this.state.faceFeatures.noseLength.min}
                    max={this.state.faceFeatures.noseLength.max}
                    value={this.state.faceFeatures.noseLength.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">noseBridge</div>
                  <Range
                    step="any"
                    data-key="noseBridge"
                    min={this.state.faceFeatures.noseBridge.min}
                    max={this.state.faceFeatures.noseBridge.max}
                    value={this.state.faceFeatures.noseBridge.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">noseTip</div>
                  <Range
                    step="any"
                    data-key="noseTip"
                    min={this.state.faceFeatures.noseTip.min}
                    max={this.state.faceFeatures.noseTip.max}
                    value={this.state.faceFeatures.noseTip.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">noseBridgeShift</div>
                  <Range
                    step="any"
                    data-key="noseBridgeShift"
                    min={this.state.faceFeatures.noseBridgeShift.min}
                    max={this.state.faceFeatures.noseBridgeShift.max}
                    value={this.state.faceFeatures.noseBridgeShift.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Брови</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">browHeight</div>
                  <Range
                    step="any"
                    data-key="browHeight"
                    min={this.state.faceFeatures.browHeight.min}
                    max={this.state.faceFeatures.browHeight.max}
                    value={this.state.faceFeatures.browHeight.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">browWidth</div>
                  <Range
                    step="any"
                    data-key="browWidth"
                    min={this.state.faceFeatures.browWidth.min}
                    max={this.state.faceFeatures.browWidth.max}
                    value={this.state.faceFeatures.browWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Скулы</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">cheekboneHeight</div>
                  <Range
                    step="any"
                    data-key="cheekboneHeight"
                    min={this.state.faceFeatures.cheekboneHeight.min}
                    max={this.state.faceFeatures.cheekboneHeight.max}
                    value={this.state.faceFeatures.cheekboneHeight.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">cheeckboneWidth</div>
                  <Range
                    step="any"
                    data-key="cheekboneWidth"
                    min={this.state.faceFeatures.cheekboneWidth.min}
                    max={this.state.faceFeatures.cheekboneWidth.max}
                    value={this.state.faceFeatures.cheekboneWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Щеки</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">cheeksWidth</div>
                  <Range
                    step="any"
                    data-key="cheeksWidth"
                    min={this.state.faceFeatures.cheeksWidth.min}
                    max={this.state.faceFeatures.cheeksWidth.max}
                    value={this.state.faceFeatures.cheeksWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Глаза</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">eyes</div>
                  <Range
                    step="any"
                    data-key="eyes"
                    min={this.state.faceFeatures.eyes.min}
                    max={this.state.faceFeatures.eyes.max}
                    value={this.state.faceFeatures.eyes.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Губы</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">lips</div>
                  <Range
                    step="any"
                    data-key="lips"
                    min={this.state.faceFeatures.lips.min}
                    max={this.state.faceFeatures.lips.max}
                    value={this.state.faceFeatures.lips.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Челюсти</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">jawWidth</div>
                  <Range
                    step="any"
                    data-key="jawWidth"
                    min={this.state.faceFeatures.jawWidth.min}
                    max={this.state.faceFeatures.jawWidth.max}
                    value={this.state.faceFeatures.jawWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">jawHeight</div>
                  <Range
                    step="any"
                    data-key="jawHeight"
                    min={this.state.faceFeatures.jawHeight.min}
                    max={this.state.faceFeatures.jawHeight.max}
                    value={this.state.faceFeatures.jawHeight.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Подбородок</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">chinLength</div>
                  <Range
                    step="any"
                    data-key="chinLength"
                    min={this.state.faceFeatures.chinLength.min}
                    max={this.state.faceFeatures.chinLength.max}
                    value={this.state.faceFeatures.chinLength.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">chinPosition</div>
                  <Range
                    step="any"
                    data-key="chinPosition"
                    min={this.state.faceFeatures.chinPosition.min}
                    max={this.state.faceFeatures.chinPosition.max}
                    value={this.state.faceFeatures.chinPosition.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">chinWidth</div>
                  <Range
                    step="any"
                    data-key="chinWidth"
                    min={this.state.faceFeatures.chinWidth.min}
                    max={this.state.faceFeatures.chinWidth.max}
                    value={this.state.faceFeatures.chinWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">chinShape</div>
                  <Range
                    step="any"
                    data-key="chinShape"
                    min={this.state.faceFeatures.chinShape.min}
                    max={this.state.faceFeatures.chinShape.max}
                    value={this.state.faceFeatures.chinShape.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>

                <Title>Шея</Title>

                <div className="lobby-create__input-block">
                  <div className="lobby-create__label">neckWidth</div>
                  <Range
                    step="any"
                    data-key="neckWidth"
                    min={this.state.faceFeatures.neckWidth.min}
                    max={this.state.faceFeatures.neckWidth.max}
                    value={this.state.faceFeatures.neckWidth.current}
                    onChange={this.onChangeFaceFeature}
                  />
                </div>
              </>
            )}
            {this.state.activeGroup === "overlay" && (
              <>
                <div className="lobby-create__input-block">
                  <Switcher
                    onClickPrevious={this.onClickHair(-1)}
                    onClickNext={this.onClickHair(1)}
                  >
                    Hair: <span>{this.state.hair.current}</span>
                  </Switcher>
                </div>

                <div className="lobby-create__input-block">
                  <Switcher
                    onClickPrevious={this.onClickColor(-1)}
                    onClickNext={this.onClickColor(1)}
                  >
                    Color: <span>{this.state.color.current}</span>
                  </Switcher>
                </div>

                <div className="lobby-create__input-block">
                  <Switcher
                    onClickPrevious={this.onClickEyeColor(-1)}
                    onClickNext={this.onClickEyeColor(1)}
                  >
                    Eye Color: <span>{this.state.eyeColor.current}</span>
                  </Switcher>
                </div>

                <HeadOverlay
                  name="blemishes"
                  text="blemishes"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.blemishes}
                />

                <HeadOverlay
                  name="facialHair"
                  text="facialHair"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.facialHair}
                />

                <HeadOverlay
                  name="eyebrows"
                  text="eyebrows"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.eyebrows}
                />

                <HeadOverlay
                  name="ageing"
                  text="ageing"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.ageing}
                />

                <HeadOverlay
                  name="makeup"
                  text="makeup"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.makeup}
                />

                <HeadOverlay
                  name="blush"
                  text="blush"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.blush}
                />

                <HeadOverlay
                  name="complexion"
                  text="complexion"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.complexion}
                />

                <HeadOverlay
                  name="sunDamage"
                  text="sunDamage"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.sunDamage}
                />

                <HeadOverlay
                  name="lipstick"
                  text="lipstick"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.lipstick}
                />

                <HeadOverlay
                  name="molesFreckles"
                  text="molesFreckles"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.molesFreckles}
                />

                <HeadOverlay
                  name="chestHair"
                  text="chestHair"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.chestHair}
                />

                <HeadOverlay
                  name="bodyBlemishes"
                  text="bodyBlemishes"
                  handler={this.onClickHeadOverlay}
                  headOverlay={this.state.headOverlays.bodyBlemishes}
                />
              </>
            )}
            {this.state.activeGroup === "clothes" && <>Clothes</>}
          </div>

          <div className="lobby-create__body-buttons">
            <Button
              disabled={this.state.loading}
              data-wide
              onClick={this.onClickCreate}
            >
              {this.state.loading ? <>Загрузка</> : <>Создать</>}
            </Button>

            {!!this.state.charactersCount && (
              <Button
                disabled={this.state.loading}
                data-wide
                onClick={this.onClickCancel}
              >
                Отмена
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export { LobbyCreator };
