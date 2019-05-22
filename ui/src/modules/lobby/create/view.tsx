import React from "react";
import "./styles.scss";
import ParentsIcon from "@/assets/icons/parents.svg";
import DnaIcon from "@/assets/icons/dna.svg";
import HairIcon from "@/assets/icons/hair.svg";
import ClothesIcon from "@/assets/icons/clothes.svg";
import IdCardIcon from "@/assets/icons/id-card.svg";
import { Switcher, Button, Range, Input, Title } from "@/components";

type TActiveGroup = "id-card" | "parents" | "dna" | "hair" | "clothes";

interface TProps {
  activeGroup: TActiveGroup;
  onClickCreate: () => void;
  onClickCancel: () => void;
  onClickGroupButton: (v: TActiveGroup) => () => void;
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
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">высота носа</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">длина носа</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина переносицы</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">кончик носа</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">сдвиг переносицы</div>
                <Range />
              </div>

              <Title>Брови</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">высота бровей</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина бровей</div>
                <Range />
              </div>

              <Title>Скулы</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">высота скул</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина скул</div>
                <Range />
              </div>

              <Title>Щеки</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина щёк</div>
                <Range />
              </div>

              <Title>Глаза</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">TODO глаза</div>
                <Range />
              </div>

              <Title>Губы</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">TODO губы</div>
                <Range />
              </div>

              <Title>Челюсти</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина челюстей</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">высота челюстей</div>
                <Range />
              </div>

              <Title>Подбородок</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">длина подбородка</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">позиция подбородка</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина подбородка</div>
                <Range />
              </div>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">TODO шэйп подбородка</div>
                <Range />
              </div>

              <Title>Шея</Title>

              <div className="lobby-create__input-block">
                <div className="lobby-create__label">ширина шеи</div>
                <Range />
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
