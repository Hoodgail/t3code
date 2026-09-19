import type {
  NavigationState,
  ParamListBase,
  StackNavigationState,
} from "@react-navigation/native";

type Route = StackNavigationState<ParamListBase>["routes"][number];

/** Project one router history into native columns and a modal presentation stack. */
export function projectWorkspaceStack(
  state: StackNavigationState<ParamListBase>,
  isOverlay: (route: Route) => boolean,
) {
  const firstOverlay = state.routes.findIndex(isOverlay);
  const workspaceRoutes = state.routes.slice(0, firstOverlay < 0 ? undefined : firstOverlay);
  const primary = workspaceRoutes.find((route) => route.name === "Home");
  const detail = workspaceRoutes.filter((route) => route.name !== "Home");
  const overlays = firstOverlay < 0 ? [] : state.routes.slice(firstOverlay);
  return { primary, detail, overlays };
}

/** Native callbacks can arrive after a JS pop or replace; those must not pop the next screen. */
export function nativeWorkspacePopCount(
  state: Pick<NavigationState, "index" | "routes">,
  dismissedKey: string,
): number {
  const index = state.routes.findIndex((route) => route.key === dismissedKey);
  return index <= 0 || index > state.index ? 0 : state.index - index + 1;
}
