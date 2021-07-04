import { IconSearch, IconX } from "@auralous/ui/assets";
import { Input } from "@auralous/ui/components/Input";
import { Size } from "@auralous/ui/styles";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: Size[8],
    paddingVertical: Size[2],
  },
});

const SearchInput: FC<{
  value: string;
  onSubmit(value: string): void;
}> = ({ onSubmit, value }) => {
  const { control, getValues, setValue } = useForm<{ search: string }>();
  const onHandleSubmit = useCallback(
    () => onSubmit(getValues().search.trim()),
    [onSubmit, getValues]
  );
  const resetSearch = useCallback(() => {
    setValue("search", "");
    onSubmit("");
  }, [setValue, onSubmit]);
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Input
        endIcon={
          value.trim().length > 0 ? (
            <TouchableOpacity onPress={resetSearch}>
              <IconX width={20} height={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onHandleSubmit}>
              <IconSearch width={20} height={20} />
            </TouchableOpacity>
          )
        }
        name="search"
        control={control}
        onSubmit={onHandleSubmit}
        returnKeyType="search"
        placeholder={t("new.select_songs.search_placeholder")}
        accessibilityLabel={t("common.label.search")}
      />
    </View>
  );
};

export default SearchInput;
