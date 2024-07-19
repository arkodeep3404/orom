import { popupsList } from "@/store/atoms";
import { useSetRecoilState } from "recoil";

export function useDashboardContent(service: string) {
  const setPopupsDashboardContent = useSetRecoilState(popupsList);

  if (service === "popup") {
    return setPopupsDashboardContent;
  }

  return null;
}
