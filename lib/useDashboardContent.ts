import { popupsList } from "@/store/atoms";
import { useSetRecoilState } from "recoil";

export default function useDashboardContent(service: string) {
  const setPopupsDashboardContent = useSetRecoilState(popupsList);

  if (service === "popups") {
    return setPopupsDashboardContent;
  }

  return null;
}
