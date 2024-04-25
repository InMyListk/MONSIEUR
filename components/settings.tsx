import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
};

export const SettingsDialog = ({ label }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"sidebar"}
          className="justify-end h-[40px] w-[220px] rounded-[10px]"
          asChild
        >
          <div className="flex items-center space-x-3">
            <p className="font-bold">{label}</p>
            <Settings />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
};
