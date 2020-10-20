import React, { useMemo } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import NProgress from "nprogress";
import { UserMenu } from "./UserMenu";
import AddNewMenu from "./AddNewMenu";
import NowPlayingPill from "./NowPlayingPill";
import { SvgLogo } from "~/assets/svg";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const noNavbarRoutes = ["/room/[roomId]", "/", "/welcome"];
const noFooterRoutes = ["/room/[roomId]", "/welcome"];

const Navbar: React.FC = () => {
  const router = useRouter();
  const shouldHideNavFoot = useMemo(
    () => noNavbarRoutes.includes(router.pathname),
    [router]
  );
  if (shouldHideNavFoot) return null;
  return (
    <nav
      className="nav fixed overflow-visible bg-background bg-opacity-25"
      style={{ backdropFilter: "blur(9px)" }}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center content-start overflow-hidden">
          <Link href="/explore">
            <a className="ml-2 mr-6" aria-label="Back to Explore">
              <SvgLogo
                className="mx-auto"
                fill="currentColor"
                width="112"
                height="32"
              />
            </a>
          </Link>
        </div>
        <div className="flex content-end items-center flex-none">
          <NowPlayingPill />
          <AddNewMenu />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const router = useRouter();
  const shouldHideNavFoot = useMemo(
    () => noFooterRoutes.includes(router.pathname),
    [router]
  );
  if (shouldHideNavFoot) return null;
  return (
    <footer className="text-center mt-20 border-t-4 py-4 max-w-xl mx-auto border-background-secondary">
      <div className="mb-1">
        <a
          href="https://www.facebook.com/withstereo/"
          target="_blank"
          rel="noreferrer"
          className="mx-2 font-bold opacity-50 hover:opacity-75"
        >
          Facebook
        </a>
        <a
          href="https://twitter.com/withstereo_"
          target="_blank"
          rel="noreferrer"
          className="mx-2 font-bold opacity-50 hover:opacity-75"
        >
          Twitter
        </a>
        <Link href="/privacy">
          <a className="mx-2 font-bold opacity-50 hover:opacity-75">Privacy</a>
        </Link>
        <Link href="/contact">
          <a className="mx-2 font-bold opacity-50 hover:opacity-75">Contact</a>
        </Link>
      </div>
      <p className="text-center opacity-50 mb-2">
        © 2019. Made with{" "}
        <span role="img" aria-label="Love">
          ❤️
        </span>
        ,{" "}
        <span role="img" aria-label="Fire">
          🔥
        </span>
        , and a{" "}
        <span role="img" aria-label="Keyboard">
          ⌨️
        </span>{" "}
        by{" "}
        <a
          className="font-bold hover:text-foreground"
          href="https://hoangvvo.com/"
        >
          Hoang
        </a>
        .
      </p>
      <p className="text-foreground-tertiary text-xs px-4 leading-tight">
        Music data provided by{" "}
        <a
          className="italic"
          rel="noreferrer nofollow"
          target="_blank"
          href="https://www.youtube.com/"
        >
          YouTube
        </a>{" "}
        and{" "}
        <a
          className="italic"
          rel="noreferrer nofollow"
          target="_blank"
          href="https://www.spotify.com/"
        >
          Spotify
        </a>
        . Cross-platform link powered by{" "}
        <a
          className="italic"
          rel="noreferrer nofollow"
          target="_blank"
          href="https://odesli.co/"
        >
          Odesli
        </a>
        .
      </p>
    </footer>
  );
};

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
