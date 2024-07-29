import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"


function SuccessDialog({ open, onClose }) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Succès</DialogTitle>
          <DialogDescription>
            Enter your username and Password  for accessing in New E.T
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={onClose}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessDialog;
