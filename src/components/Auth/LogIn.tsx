import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";
import { Dialog } from "@reach/dialog";
import { useModal } from "~/components/Modal/index";
import Welcome from "./Welcome";
import { OAuthProviderName } from "~/graphql/gql.gen";
import { SvgSpotify, SvgGoogleColor } from "~/assets/svg";

const SignInContext = createContext<[boolean, () => void]>([
  false,
  () => undefined,
]);

enum AuthState {
  WAITING,
  CONNECTING,
  SUCCESS,
  FAIL,
}

const LogInModal: React.FC<{ active: boolean; close: () => void }> = ({
  active,
  close: closeModal,
}) => {
  const windowRef = useRef<Window | null>();
  const [isAuth, setIsAuth] = useState<AuthState>(AuthState.WAITING);

  const [activeWelcome, openWelcome, closeWelcome] = useModal();

  const close = useCallback(() => {
    windowRef.current?.close();
    closeWelcome();
    closeModal();
  }, [closeModal, closeWelcome]);

  const logIn = useCallback(
    (provider: OAuthProviderName) => {
      setIsAuth(AuthState.CONNECTING);
      windowRef.current = window.open(
        `${process.env.API_URI}/auth/${
          provider === OAuthProviderName.Youtube ? "google" : provider
        }`,
        "Login",
        "width=800,height=600"
      );

      let interval: number;

      new Promise<0 | 1 | 2>((resolve) => {
        interval = window.setInterval(() => {
          try {
            if (!windowRef.current || windowRef.current.closed)
              return resolve(0);
            if (windowRef.current.location.origin === process.env.APP_URI) {
              windowRef.current.close();
              const url = new URL(windowRef.current.location.href);
              if (url.searchParams.get("isNew")) resolve(2);
              else resolve(1);
            }
          } catch (e) {
            // noop
          }
        }, 500);
      }).then((success) => {
        if (success) (window as any).resetUrqlClient();
        window.clearInterval(interval);
        if (success) {
          (window as any).resetUrqlClient();
          success === 1 ? close() : openWelcome();
        }
        setIsAuth(success ? AuthState.SUCCESS : AuthState.FAIL);
      });
    },
    [close, openWelcome]
  );

  useEffect(() => {
    if (isAuth === AuthState.SUCCESS) {
      setIsAuth(AuthState.WAITING);
    }
  }, [isAuth, close]);

  return (
    <>
      <Dialog
        aria-label="Sign in to Stereo"
        isOpen={active}
        onDismiss={close}
        className="h-full w-full p-2"
      >
        <div className="container">
          <div className="text-center flex flex-col items-center px-2 py-24">
            <h1 className="text-3xl font-bold">Hellooo!</h1>
            <div className="flex flex-wrap place-center">
              <div className="m-1 p-2 flex flex-col">
                <span className="text-foreground-secondary mb-1 text-xs">
                  Listen on <b>YouTube</b>
                </span>
                <button
                  onClick={() => logIn(OAuthProviderName.Youtube)}
                  className="button bg-white text-black text-opacity-50 h-12"
                  disabled={isAuth === AuthState.CONNECTING}
                >
                  <SvgGoogleColor
                    width="24"
                    fill="currentColor"
                    strokeWidth="0"
                  />
                  <span className="ml-4 text-sm">Continue with Google</span>
                </button>
              </div>
              <div className="m-1 p-2 flex flex-col">
                <span className="text-foreground-secondary  mb-1 text-xs">
                  Listen on <b>Spotify</b>
                </span>
                <button
                  onClick={() => logIn(OAuthProviderName.Spotify)}
                  className="button brand-spotify h-12"
                  disabled={isAuth === AuthState.CONNECTING}
                >
                  <SvgSpotify width="24" fill="currentColor" strokeWidth="0" />
                  <span className="ml-2 text-sm">Continue with Spotify</span>
                </button>
              </div>
            </div>
            <div className="mt-4 text-xs text-foreground-secondary">
              <p>
                YouTube Premium lets you enjoy ad-free and background play. See{" "}
                <a
                  style={{ color: "#ff0022" }}
                  className="opacity-50 hover:opacity-75"
                  href="https://www.youtube.com/premium"
                >
                  youtube.com/premium
                </a>{" "}
                for more info.
              </p>
              <p>
                A Spotify subscription is required to play any track, ad-free.
                Go to{" "}
                <a
                  style={{ color: "#1db954" }}
                  className="opacity-50 hover:opacity-75"
                  href="https://www.spotify.com/premium"
                >
                  spotify.com/premium
                </a>{" "}
                to try it for free.
              </p>
            </div>
            <button className="mt-4 button" onClick={close}>
              Go back
            </button>
          </div>
          <p className="mx-auto w-128 max-w-full p-4 text-foreground-tertiary text-xs text-center">
            By continuing, you agree to our{" "}
            <Link href="/privacy">
              <button className="underline" onClick={close}>
                Privacy Policy
              </button>
            </Link>{" "}
            as well as{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/t/terms"
              className="underline"
            >
              YouTube Terms of Service
            </a>{" "}
            and/or{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.spotify.com/us/legal/privacy-policy/"
              className="underline"
            >
              Spotify Privacy Policy
            </a>{" "}
            where applicable.
          </p>
        </div>
      </Dialog>
      <Welcome active={activeWelcome} close={close} />
    </>
  );
};

export const LogInProvider: React.FC = ({ children }) => {
  const [active, open, close] = useModal();
  return (
    <>
      <SignInContext.Provider value={[active, open]}>
        {children}
        <LogInModal active={active} close={close} />
      </SignInContext.Provider>
    </>
  );
};

export const useLogin = () => {
  return useContext(SignInContext);
};
