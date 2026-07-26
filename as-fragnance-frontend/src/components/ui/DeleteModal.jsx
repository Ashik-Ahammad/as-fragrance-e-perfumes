"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function DeleteModal({ perfume, onSuccess }) {
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Deleting perfume...");

    try {

      const { data: tokenData } = await authClient.token();
      const jwtToken = tokenData?.token;

      if (!jwtToken) {
        toast.error("Authentication failed. Please login again.", {
          id: loadingToast,
        });
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/perfume/${perfume?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (res.ok) {
        toast.success("Perfume permanently deleted.", { id: loadingToast });
        if (onSuccess) onSuccess();
        else {
          router.push("/shop");
          router.refresh();
        }
      } else {
        throw new Error("Deletion failed");
      }
    } catch (error) {
      toast.error("Failed to delete perfume.", { id: loadingToast });
    }
  };

  return (
    <AlertDialog>
      <Button className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-50 border border-stone-200 text-stone-500 text-xs font-bold uppercase hover:cursor-pointer tracking-wider rounded-xl hover:bg-rose-200 hover:border-rose-200 hover:text-rose-600 transition-all duration-300 active:scale-95">
        <FiTrash2 className="text-sm" /> <span>Delete</span>
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete this perfume?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                className="cursor-pointer hover:cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
                className="cursor-pointer hover:cursor-pointer"
              >
                Confirm delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
