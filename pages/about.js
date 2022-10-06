import Link from "next/link";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import InfoCard from "../componenets/InfoCard";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import useScrollSnap from "react-use-scroll-snap";
import { useRef, useEffect, useState } from "react";
import {
  IconButton,
  Button,
  getLinkUtilityClass,
  TextField,
  TextFieldProps,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import Section from "../componenets/Section";
import MainMenu from "../componenets/Menu";
import { useRouter } from "next/router";
import { first, second, third } from "../data/static";

function About({ menu, logo, background }) {
  const scroller = useRef();
  const textRef = useRef();
  const scrollRef = useRef();
  const router = useRouter();

  const newScroll = () => {
    router.push({ pathname: "/", query: { data: "about" } });
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
          {/* <div className={styles.titleArea}> */}

          <div className={styles.primaryTitle}>
            <h1
              style={{
                fontStyle: "normal",
                fontFamily: "Garamond Premier Pro, sans-serif",
              }}
            >
              Good Enough
            </h1>
          </div>
          {/* </div> */}

          <div
            style={{ paddingBottom: "80px" }}
            className={styles.individualSectionsAbout}
          >
            <Section dataType="first" />
            <Section dataType="second" />
            <Section dataType="third" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

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
