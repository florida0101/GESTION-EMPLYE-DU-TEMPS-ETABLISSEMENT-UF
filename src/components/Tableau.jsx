import React from "react";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Update from "./Update";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function Tableau({ data }) {
    const weekdays = new Set((data.length > 0) ? data.map((item) => item.weekday) : []); // Get unique weekdays

    console.log(data)

    //état pour le diaogue de update
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [parcoursId, setParcoursId]= useState('');

    //Pour stocker le programme sélectionné
    const [programmeSelectionne, setProgrammeSelectionne] = useState({});

    const handleOpenUpdateDialog = (programme) => {
        setOpenUpdateDialog(true);
        setProgrammeSelectionne(programme);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
        setProgrammeSelectionne(null);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Date et Heures</TableHead>
                        {/* Dynamically create TableCells for weekdays */}
                        {[...weekdays].map((day) => (
                            <TableHead key={day} className="font-bold">
                                {day}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(data.length > 0)
                        ? data.map((item) => (
                            <TableRow key={item.programId}>
                                <TableCell className="flex flex-col">
                                    <span>{new Date(item.date).toLocaleDateString()} {item.date.slice(10)}</span>
                                    <span>{item.startTime} - {item.endTime}</span>
                                </TableCell>
                                {/* Find program for each weekday and display it */}
                                {[...weekdays].map((day) => (
                                    <TableCell key={`${item.programId}-${day}`}>
                                        {item.weekday === day ? item.moduleName : ''}
                                    </TableCell>
                                ))}

                                {/* Rendu conditionnel des icônes d'édition uniquement sur la route '/body' */}
                                {location.pathname === "/admin" && (
                                    <div className="flex mt-4">
                                        <div key={item.programId} className="flex items-center">
                                            <FaEdit
                                                onClick={() => handleOpenUpdateDialog(item)}
                                                className="fill-red-700 cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                                                style={{ fontSize: "20px" }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </TableRow>
                        ))
                        : null}
                </TableBody>
            </Table>

            <Update open={openUpdateDialog} onClose={handleCloseUpdateDialog} program={programmeSelectionne} />
        </div>
    );
}

export default Tableau;
