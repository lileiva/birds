import { FC, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddNoteFormProps {
  onCancel: () => void;
  onSubmit: (values: { location: string; note: string }) => Promise<void>;
}
export const AddNoteForm: FC<AddNoteFormProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({ location: "", note: "" });
  const isFormValid =
    formData.location.trim() !== "" && formData.note.trim() !== "";

  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const location = formData.get("location") as string;
    const note = formData.get("note") as string;

    startTransition(() => {
      onSubmit({ location, note }).then(() => {
        setIsDialogOpen(false);
      });
    });
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setFormData({ location: "", note: "" });
    onCancel();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="px-2 py-1 text-nowrap sm:px-3  self-center rounded-[8px] border-[1px] 
              border-[hsla(216,33%,6%,0.06)] text-center 
              shadow-[0px_1px_0.5px_-1px_hsla(210,90%,9%,0.12),0px_2px_4px_0px_hsla(210,91%,9%,0.04)]
              hover:bg-[#F8FAFB] transition-colors duration-200"
        >
          Add Note
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <DialogTitle className="py-4 px-4 text-[13px] leading-[16px] font-[600] font-['Inter'] text-[#0D171C]">
              Add a note
            </DialogTitle>
            <hr className="border-[#D5DADF]" />

            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-4 px-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="location"
                    className="text-[13px] leading-[16px] font-[600] font-['Inter'] text-[hsla(0,0%,43%,1)]"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Where did you spot it?"
                    disabled={isPending}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full px-3 h-[40px] rounded-lg
            focus:bg-white
            bg-[hsla(213,37%,48%,0.08)]
            border border-[hsla(213,37%,48%,0.08)]
            placeholder:text-[#4F7A96] focus:outline-none
            focus:border-[hsla(221,88%,53%,1)]
            focus:shadow-[0px_0px_0px_3px_hsla(221,88%,53%,0.1)]
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            font-['Inter'] font-normal text-[13px] leading-[16px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="note"
                    className="text-[13px] leading-[16px] font-[600] font-['Inter'] text-[hsla(0,0%,43%,1)]"
                  >
                    Note
                  </label>
                  <textarea
                    name="note"
                    placeholder="Enter your notes here"
                    rows={4}
                    disabled={isPending}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, note: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg
            focus:bg-white
            bg-[hsla(213,37%,48%,0.08)]
            border border-[hsla(213,37%,48%,0.08)]
            placeholder:text-[#4F7A96] focus:outline-none
            focus:border-[hsla(221,88%,53%,1)]
            focus:shadow-[0px_0px_0px_3px_hsla(221,88%,53%,0.1)]
            resize-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            font-['Inter'] font-normal text-[13px] leading-[16px]"
                  />
                </div>
              </div>
            </div>

            <hr className="border-[#D5DADF]" />
            <div className="py-4 px-4">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="px-3 py-2 rounded-lg border border-[#D5DADF] 
              text-[#4F7A96] hover:bg-[#F8FAFB] 
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-4 h-[40px] rounded-lg bg-[#4361EE] text-white 
              transition-all duration-200 font-medium
              shadow-[0px_1px_1px_-1px_rgba(2,23,44,0.12),0px_2px_4px_0px_rgba(2,23,44,0.04),0px_-2px_4px_-1px_rgba(255,255,255,0.08)]
              hover:shadow-[0px_1px_1px_-1px_rgba(2,23,44,0.12),0px_2px_4px_0px_rgba(2,23,44,0.04),0px_-4px_6px_-1px_rgba(255,255,255,0.12)]
              hover:translate-y-[1px]
              active:translate-y-[2px]
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:translate-y-0
              disabled:hover:shadow-[0px_1px_1px_-1px_rgba(2,23,44,0.12),0px_2px_4px_0px_rgba(2,23,44,0.04),0px_-2px_4px_-1px_rgba(255,255,255,0.08)]"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
