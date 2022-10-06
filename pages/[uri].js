import Head from "next/head";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import MainMenu from "../componenets/Menu";

export default function SinglePage({ page, menu, logo }) {
  const newScroll = () => {
    console.log("test");
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.sideContainer}>
          <MainMenu menu={menu} logo={logo} fn={newScroll} />
        </div>
        <div id="sectionsContainer" className={styles.sectionsContainer}>
          {/* <div className={styles.titleArea}> */}

          {/* </div> */}

          <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const GET_POST = gql`
    query GetPosts($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
      }
      menu(id: "Test Primary", idType: NAME) {
        menuItems {
          nodes {
            label
            id
            parentId
          }
        }
      }
    }
  `;

  const GET_LOGO = gql`
    query MyQuery2 {
      mediaItem(id: "logo", idType: SLUG) {
        sourceUrl
      }
    }
  `;

  const response = await client.query({
    query: GET_POST,
    variables: {
      id: params.uri,
    },
  });

  const responseLogo = await client.query({
    query: GET_LOGO,
  });

  const page = response.data.page;
  const menu = response.data.menu.menuItems.nodes;
  const logo = responseLogo.data.mediaItem.sourceUrl;
  return {
    props: {
      page,
      menu,
      logo,
    },
  };
}

export async function getStaticPaths() {
  const paths = ["/videography"];
  return {
    paths,
    fallback: "blocking",
  };
}
