import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { SvgX } from "~/assets/svg";
import { useTransition, animated, config as springConfig } from "react-spring";

const ModalHeader: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={`p-4 border-b-2 border-opacity-10 border-white ${
      className || ""
    }`}
  >
    {children}
  </div>
);

const ModalTitle: React.FC = ({ children }) => (
  <h4 className="text-lg font-bold flex items-center">{children}</h4>
);

const ModalContent: React.FC<{ className?: string; noPadding?: boolean }> = ({
  children,
  className,
  noPadding,
}) => (
  <div
    className={`${noPadding ? "" : "px-4 py-8"} flex-1 overflow-auto ${
      className || ""
    }`}
  >
    {children}
  </div>
);

const ModalFooter: React.FC = ({ children }) => (
  <div className="flex modal-footer h-12">{children}</div>
);

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

const Modal: React.FC<{
  title: string;
  active: boolean;
  close?: () => void;
  className?: string;
}> = ({ title, children, active, close, className }) => {
  const transitions = useTransition(active, null, {
    from: {
      opacity: 0,
      transform: "translateY(-40px)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    leave: {
      opacity: 0,
      transform: "translateY(-40px)",
    },
    config: springConfig.gentle,
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props: style }) =>
          item && (
            <AnimatedDialogOverlay
              isOpen={style.opacity !== 0}
              onDismiss={() => close && close()}
              key={key}
              style={{ opacity: style.opacity }}
              as="div"
            >
              {/* FIXME: possibly upstream, aria-label tag not passed along */}
              <AnimatedDialogContent
                style={{ transform: style.transform }}
                className={className}
                as="div"
                aria-label={title}
              >
                {children}
                {close && (
                  <button
                    className="btn btn-transparent absolute p-2 top-2 right-2"
                    onClick={close}
                  >
                    <SvgX />
                  </button>
                )}
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  );
};

export default {
  Modal,
  Header: ModalHeader,
  Title: ModalTitle,
  Content: ModalContent,
  Footer: ModalFooter,
};
