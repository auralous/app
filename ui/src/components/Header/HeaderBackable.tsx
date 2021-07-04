import { IconChevronLeft } from "@auralous/ui/assets";
import { Button } from "@auralous/ui/components/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";

/**
 * Header with a back button that calls navigation.back
 */
interface HeaderBackableProps {
  title: string;
  backText?: string;
  onBack(): void;
}

const HeaderBackable: FC<HeaderBackableProps> = ({
  title,
  backText,
  onBack,
}) => {
  const { t } = useTranslation();

  return (
    <Header
      left={
        <Button
          onPress={onBack}
          icon={<IconChevronLeft />}
          accessibilityLabel={backText || t("common.navigation.go_back")}
        >
          {backText}
        </Button>
      }
      title={title}
    />
  );
};

export default HeaderBackable;
