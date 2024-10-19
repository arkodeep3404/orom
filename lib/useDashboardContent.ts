import { popupsList } from "@/lib/stateStore/popupsState";
import { waitlistsList } from "@/lib/stateStore/waitlistsState";
import { useSetRecoilState } from "recoil";

export default function useDashboardContent(service: string) {
  const setPopupsDashboardContent = useSetRecoilState(popupsList);
  const setWaitlistsDashboardContent = useSetRecoilState(waitlistsList);

  if (service === "popups") {
    return setPopupsDashboardContent;
  }

  if (service === "waitlists") {
    return setWaitlistsDashboardContent;
  }

  return null;
}
