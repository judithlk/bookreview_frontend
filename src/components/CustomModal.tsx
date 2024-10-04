import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";


export default function CustomModal() {
  return (
      export default function Modal({children, trigger}:any) {
    return (
        <AlertDialog open={trigger}>
        <AlertDialogTitle ></AlertDialogTitle>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          {children}
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  );
}
