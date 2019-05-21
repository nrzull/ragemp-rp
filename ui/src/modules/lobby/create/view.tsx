import React from "react";
import "./styles.scss";
import ParentsIcon from "@/assets/icons/parents.svg";
import DnaIcon from "@/assets/icons/dna.svg";
import HairIcon from "@/assets/icons/hair.svg";
import ClothesIcon from "@/assets/icons/clothes.svg";
import IdCardIcon from "@/assets/icons/id-card.svg";
import { Switcher } from "@/components";

type TActiveGroup = "id-card" | "parents" | "dna" | "hair" | "clothes";

interface TProps {
  activeGroup: TActiveGroup;
  onClickCreate: () => void;
  onClickCancel: () => void;
}

function View(props: TProps) {
  return (
    <section className="lobby-create">
      <nav className="lobby-create__navigation">
        <div
          data-active={props.activeGroup === "id-card"}
          className="lobby-create__navigation-button"
        >
          <IdCardIcon />
        </div>

        <div
          data-active={props.activeGroup === "parents"}
          className="lobby-create__navigation-button"
        >
          <ParentsIcon />
        </div>

        <div
          data-active={props.activeGroup === "dna"}
          className="lobby-create__navigation-button"
        >
          <DnaIcon />
        </div>

        <div
          data-active={props.activeGroup === "hair"}
          className="lobby-create__navigation-button"
        >
          <HairIcon />
        </div>

        <div
          data-active={props.activeGroup === "clothes"}
          className="lobby-create__navigation-button"
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
                <input type="text" className="lobby-create__input" />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">Фамилия</div>
                <input type="text" className="lobby-create__input" />
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
              <div className="lobby-create__input-block">
                <div className="lobby-create__label">Высота бровей</div>
                <input type="range" className="lobby-create__range" />
              </div>
            </>
          )}

          {props.activeGroup === "hair" && <>Hair</>}

          {props.activeGroup === "clothes" && <>Clothes</>}
        </div>

        <div className="lobby-create__body-buttons">
          <button
            data-primary
            className="lobby-create__body-button"
            onClick={props.onClickCreate}
          >
            Создать
          </button>

          <button
            className="lobby-create__body-button"
            onClick={props.onClickCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </section>
  );
}

export { View, TActiveGroup };
