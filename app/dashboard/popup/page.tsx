import { Button } from "@/components/ui/button";
import ExistingListCard from "@/components/dashboard/existingListCard";
import CreateExistingDialog from "@/components/dashboard/createNewDialog";

export default function PopupDashboard() {
  return (
    <div>
      <div className="flex w-[calc(100vw-5rem)] justify-end m-10">
        <CreateExistingDialog
          trigger={<Button> Create new </Button>}
          service="popup"
        />
      </div>

      <ExistingListCard title="Hello World" />
    </div>
  );
}
