import Image from "next/image";
import styles from "../styles/InfoCards.module.css";
import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function InfoCard({ title, description, image, textOnly, itemId }) {
  const myLoader = ({ src, width, quality }) => {
    return `${image}`;
  };
  const visibility = React.useContext(VisibilityContext);

  return (
    <div className={styles.infoCard}>
      {textOnly && (
        <div className={styles.text}>
          <p>{description}</p>
        </div>
      )}
      {!textOnly && (
        <>
          <Image
            draggable="false"
            loader={myLoader}
            src="https://via.placeholder.com/440"
            alt="placeholder"
            width={440}
            height={360}
          />
          <h4 className={styles.cardTitle}>{title}</h4>
          <h5 className={styles.cardDescription}>{description}</h5>
        </>
      )}
    </div>
  );
}

export default InfoCard;
