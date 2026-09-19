import { requireOptionalNativeModule } from "expo";
import { Platform, View } from "react-native";
import type { WorkspaceColumnsProps } from "./NativeWorkspaceColumns";

const nativeControls = requireOptionalNativeModule<{ readonly supportsWorkspaceColumns?: boolean }>(
  "T3NativeControls",
);
export const NATIVE_WORKSPACE_COLUMNS_SUPPORTED =
  Number(Platform.Version) >= 26 && nativeControls?.supportsWorkspaceColumns === true;

// The v5 navigator owns native columns. This is only the older-client fallback.
export function NativeWorkspaceColumns(props: WorkspaceColumnsProps) {
  return (
    <View testID="adaptive-workspace-layout" style={{ flex: 1, flexDirection: "row" }}>
      {props.sidebar}
      {props.children}
      {props.inspector}
    </View>
  );
}
