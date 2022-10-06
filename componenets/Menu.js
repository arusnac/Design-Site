import {
  IconButton,
  Button,
  getLinkUtilityClass,
  TextField,
  TextFieldProps,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import useWindowDimensions from "../util/useWindowDimensions";
import MenuIcon from "@mui/icons-material/Menu";

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: 0,
    minWidth: 180,
    backgroundColor: "transparent",
    color: "#e05f62",
    fontFamily: "Acumin Pro Wide, sans-serif",
    fontStyle: "normal",
    textTransform: "uppercase",
    textDecoration: "underline",
    boxShadow: "none",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
  "& .MuiMenuItem-root": { backgroundColor: "red" },
  "& .MuiMenuItem-root": {
    "& .MuiSvgIcon-root": {
      fontSize: 18,
      color: "white",
      marginRight: 0,
    },
    "&:active": {
      backgroundColor: "red",
    },
  },
});

function MainMenu({ menu, logo, fn }) {
  const [linksMenu, setLinks] = useState([]);
  useEffect(() => {
    if (menu) getLinks(menu);
  }, [menu]);

  const myLoader = ({ src, width, quality }) => {
    return `${logo}`;
  };

  const links = [];

  const getLinks = (menuItem) => {
    for (var i in menuItem) {
      if (menuItem[i].label === "Contact") {
        links.push({
          label: menuItem[i].label,
          id: menuItem[i].id,
          parent: menuItem[i].parentId,
          child: [],
        });
      }
      if (menuItem[i].label !== "Contact") {
        links.push({
          label: menuItem[i].label,
          id: menuItem[i].id,
          parent: menuItem[i].parentId,
          child: [],
        });
      }
    }
    if (menuItem[i].parentId) {
    }
    for (const link of links) {
      if (link.parent) {
        let index = links.findIndex((element) => element.id === link.parent);
        links[index].child.push(link.label);
      }
    }

    setLinks(links);
  };
  const router = useRouter();
  const handleRouting = () => {
    router.push("/", { scroll: true });
  };

  const routeChild = (href) => {
    router.push(`/${href}`);
  };

  const assignLinks = (link) => {
    if (link.parent) return;
    else if (link.child.length > 0)
      return (
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {link.label}
            <ArrowDownwardIcon />
          </IconButton>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {link.child.map((child) => {
              return (
                <MenuItem
                  key={child}
                  onClick={() => {
                    routeChild(child.toLowerCase());
                  }}
                >
                  {child}
                </MenuItem>
              );
            })}
          </StyledMenu>
        </div>
      );
    else if (link.label !== "Contact")
      if (link.label === "Home") return <Link href={`/`}>{link.label}</Link>;
      else
        return <Link href={`/${link.label.toLowerCase()}`}>{link.label}</Link>;
    else if (link.label === "Contact")
      return <button onClick={fn}>{link.label}</button>;
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const { height, width } = useWindowDimensions();
  const [logoHeight, setLogoHeight] = useState(120);
  const [logoWidth, setLogoWidth] = useState(209);

  useEffect(() => {
    console.log(height, width);
    if (width < 500) {
      setLogoHeight(100);
      setLogoWidth(157);
    } else {
      setLogoHeight(120);
      setLogoWidth(209);
      setMenuOpen(true);
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  return (
    <div className={styles.sideContainer}>
      <div className={styles.logo}>
        <Image
          src={logo}
          width={logoWidth}
          height={logoHeight}
          loader={myLoader}
          alt="logo"
          onClick={handleLogoClick}
        />
      </div>
      <IconButton
        sx={{ position: "fixed", right: "50px", fontSize: "24px" }}
        onClick={handleMenuOpen}
        className={styles.menuIconButton}
      >
        <MenuIcon sx={{ fontSize: 30, color: "#e05f62" }} />
      </IconButton>
      <div className={styles.menu}>
        {menuOpen && (
          <div>
            {linksMenu.map((linksMenuItem) => {
              return (
                <ul key={linksMenuItem.id}>{assignLinks(linksMenuItem)}</ul>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainMenu;
