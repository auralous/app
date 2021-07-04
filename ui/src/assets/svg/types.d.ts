declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const ReactComponent: React.FunctionComponent<SvgProps>;
  export default ReactComponent;
}
