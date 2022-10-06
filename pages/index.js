import Link from "next/link";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import InfoCard from "../componenets/InfoCard";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import useScrollSnap from "react-use-scroll-snap";
import { useRef, useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LeftArrow, RightArrow } from "../util/arrows";
import {
  IconButton,
  Button,
  getLinkUtilityClass,
  TextField,
  TextFieldProps,
  Menu,
  MenuItem,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { stories, experiences, relationships } from "../data/static";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import useDrag from "../util/useDrag";
import React from "react";
import Section from "../componenets/Section";
import MainMenu from "../componenets/Menu";
import { useRouter } from "next/router";
import useWindowDimensions from "../util/useWindowDimensions";

const CssTextField = styled(TextField)({
  "& label": {
    color: "white",
    fontFamily: "Acumin Pro Wide, sans-serif",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: "14px",
    lineHeight: "36px",
    margin: "0",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#E05F62",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "white",
      borderRadius: "0px",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottomColor: "#E05F62",
    },
    "&:hover fieldset": {
      borderBottomColor: "#E05F62",
    },
    "&.Mui-focused fieldset": {
      borderBottomColor: "#E05F62",
    },
  },
});

const elemPrefix = "test";
const getId = (index) => `${elemPrefix}${index}`;

export default function Home({ menu, background, logo, menuAll }) {
  const router = useRouter();

  const scroller = useRef();
  const textRef = useRef();
  const scrollRef = useRef();

  const { height, width } = useWindowDimensions();
  const [menuStyle, setMenuStyle] = useState(styles.sideContainer);

  useEffect(() => {
    //console.log(height, width);
    // if (width < 500) setMenuStyle(styles.mobileMenu);
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.data === "about") newScroll();
  }, [router.isReady]);
  const newScroll = () => {
    const top = textRef.current.offsetTop;
    scroller.current.scrollTo({ top: top, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/lss1rof.css" />
      </Head>

      <div className={styles.main}>
        <div className={styles.sideContainer}>
          <MainMenu menu={menu} logo={logo} fn={newScroll} />
        </div>
        <div
          id="sectionsContainer"
          className={styles.sectionsContainer}
          ref={scroller}
        >
          <div className={styles.titleArea}>
            <div className={styles.header}>
              <h1>Above all,</h1>
            </div>
            <div className={styles.primaryTitle}>
              <h1>we create</h1>
            </div>
          </div>

          <div className={styles.individualSections}>
            <Section dataType="stories" />
            <Section dataType="experiences" />
            <Section dataType="relationships" />
          </div>
          <div className={styles.contactContainer} ref={scrollRef}>
            <div className={styles.textAreaContainer} ref={textRef}>
              <h1>anything you need</h1>

              <div className={styles.textArea}>
                <p>
                  Ask us about anything or contact us to get started on your
                  project!
                  <br /> <br />
                  We’ll get back to you as soon as possible, and if we don’t
                  please message us again.
                </p>
              </div>
            </div>
            <div className={styles.formArea}>
              <CssTextField id="standard-basic" label="NAME" />
              <CssTextField
                sx={{
                  "& .MuiInput-underline": {
                    borderBottomColor: "yellow",
                  },
                }}
                id="standard-basic"
                label="EMAIL"
                margin="dense"
              />
              <CssTextField
                id="standard-textarea"
                label="NOTE"
                placeholder=""
                multiline
                rows={6}
                margin="dense"
              />

              <Button
                sx={{
                  justifyContent: "left",
                  paddingLeft: "10px",
                  color: "white",
                  borderColor: "#E05F62",
                  borderRadius: "0",
                  borderBottom: "solid 1px #E05F62",
                }}
                variant="text"
              >
                SUBMIT
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const GET_MENUS = gql`
    query MenuLinks {
      menu(id: "Test Primary", idType: NAME) {
        menuItems {
          nodes {
            label
            id
            parentId
          }
        }
      }
      mediaItem(id: "background", idType: SLUG) {
        mediaItemUrl
      }
      mediaItems(where: { name: "logo" }) {
        nodes {
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  `;
  const response = await client.query({
    query: GET_MENUS,
  });

  const logo = response.data.mediaItems.nodes[0].mediaItemUrl;
  const background = response.data.mediaItem.mediaItemUrl;
  const menu = response.data.menu.menuItems.nodes;
  const menuAll = response.data.menu;
  return {
    props: {
      menu,
      background,
      logo,
      menuAll,
    },
  };
}
