import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader
} from "@/components/ui/dialog";

import { HiXCircle } from "react-icons/hi"

import Tableau from "./Tableau";

function FreshTimetableDialog({ open, onClose, data }) {
    return (
        <Dialog open={open}>
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle>
                        <HiXCircle className="bg-gray-600" size={24} onClick={onClose} />
                    </DialogTitle>
                </DialogHeader>
                <Tableau data={data} />
            </DialogContent>
        </Dialog>
    );
}

export default FreshTimetableDialog;
