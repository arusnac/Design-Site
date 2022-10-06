import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import InfoCard from "./InfoCard";
import styles from "../styles/Home.module.css";
import {
  stories,
  experiences,
  relationships,
  first,
  second,
  third,
} from "../data/static";
import useDrag from "../util/useDrag";
import { useState } from "react";
import { LeftArrow, RightArrow } from "../util/arrows";

const Section = ({ dataType }) => {
  let data;
  let style;

  switch (dataType) {
    case "stories":
      data = stories;
      style = styles.sections;
      break;
    case "relationships":
      data = relationships;
      style = styles.sections;
      break;
    case "experiences":
      data = experiences;
      style = styles.sections;
      break;
    case "first":
      data = first;
      style = styles.sectionsAbout;
      break;
    case "second":
      data = second;
      style = styles.sectionsAbout;
      break;
    case "third":
      data = third;
      style = styles.sectionsAbout;
      break;
      defualt: console.log("Not found");
  }

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState("");
  const handleItemClick = (itemId) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : "");
  };
  return (
    <div className={style}>
      <div style={{ marginBottom: "15px" }} className={styles.mainTitle}>
        <h1
          style={{
            fontStyle: "normal",
            fontFamily: "Garamond Premier Pro, sans-serif",
          }}
          className={styles.sectionTitle}
        >
          {data.mainTitle} {data.secondaryTitle ? data.secondaryTitle : ""}
        </h1>
        <InfoCard
          key={data.data[0].title}
          textOnly={data.data[0].textOnly}
          title={data.data[0].title}
          description={data.data[0].description}
          image={data.data[0].image}
        />
      </div>
      <div onMouseLeave={dragStop}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
        >
          {data.data.map((item, idx) => {
            return (
              <InfoCard
                key={item.title}
                textOnly={item.textOnly}
                title={item.title}
                description={item.description}
                image={item.image}
                itemId={idx}
                id={idx}
              />
            );
          })}
          {/* </div> */}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default Section;
