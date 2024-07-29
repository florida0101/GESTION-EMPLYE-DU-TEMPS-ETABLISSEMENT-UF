import React, { useEffect } from "react";
import './style.css';
import { useState } from "react";
import { fetchFreshTimetable, fetchFilteredCourses } from "./requests";
import { getGroupedCourse, getMondayDateOfCurrentWeek } from "./toolbox"
import FreshTimetableDialog from "./FreshTimetableDialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function Contenue() {
    const [mondayDate, setMondayDate] = useState(null);
    const [timetableData, setTimetableData] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courseData, setCourseData] = useState({ l1: [], l2: [], l3: [], m1: [], m2: [] });
    const [openTimetableDialog, setOpenTimetableDialog] = useState(false);

    // Change l'état d'ouverture et fermeture du dialogue de l'emploi du temps
    const toggleTimetableDialog = () => {
        setOpenTimetableDialog(!openTimetableDialog);
    }

    // Définie le Lundi quand le composant est chargé
    useEffect(() => {
        setMondayDate(getMondayDateOfCurrentWeek());
    }, []);

    // Définie les données des parcours
    useEffect(() => {
        fetchFilteredCourses()
            .then(value => {
                const formattedData = getGroupedCourse(value);
                setCourseData(formattedData)
            });
    }, []);

    // Définie l'emploi du temps à mettre dans le tableau
    useEffect(() => {
        if (mondayDate) {
            fetchFreshTimetable(selectedCourseId, mondayDate)
                .then(value => setTimetableData(value));
        }
    }, [mondayDate, selectedCourseId]);

    return (
        <>
            <div className="contenue contenue-1 flex justify-evenly bg-white mt-80 m-48 h-40 opacity-70 rounded-full shadow-2xl">
                <div className="mt-14 font-bold flex gap-2 text-white">
                    <label htmlFor="L1" className="text-black size-6 mt-2">L1</label>
                    <Select
                        value={selectedCourseId}
                        onValueChange={(value) => {
                            setSelectedCourseId(value);
                            toggleTimetableDialog();
                        }}
                    >
                        <SelectTrigger className="bg-red-700 w-[180px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <SelectValue placeholder="L1" />
                        </SelectTrigger>
                        <SelectContent>
                            {(courseData.l1.length > 0)
                                ? courseData.l1.map((option) => (
                                    <SelectItem value={option.courseId} key={option.courseId}>{option.courseName}</SelectItem>
                                ))
                                : null
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-14 font-bold flex gap-2 text-white">
                <label htmlFor="L1" className="text-black size-6 mt-2">L2</label>

                    <Select
                        value={selectedCourseId}
                        onValueChange={(value) => {
                            setSelectedCourseId(value);
                            toggleTimetableDialog();
                        }}
                    >
                        <SelectTrigger className="bg-red-700 w-[180px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <SelectValue placeholder="L2" />
                        </SelectTrigger>
                        <SelectContent>
                            {(courseData.l2.length > 0)
                                ? courseData.l2.map((option) => (
                                    <SelectItem value={option.courseId} key={option.courseId}>{option.courseName}</SelectItem>
                                ))
                                : null
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-14 font-bold  gap-2 flex text-white">
                <label htmlFor="L1" className="text-black size-6 mt-2">L3</label>
                    <Select
                        value={selectedCourseId}
                        onValueChange={(value) => {
                            setSelectedCourseId(value);
                            toggleTimetableDialog();
                        }}
                    >
                        <SelectTrigger className="bg-red-700 w-[180px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <SelectValue placeholder="L3" />
                        </SelectTrigger>
                        <SelectContent>
                            {(courseData.l3.length > 0)
                                ? courseData.l3.map((option) => (
                                    <SelectItem value={option.courseId} key={option.courseId}>{option.courseName}</SelectItem>
                                ))
                                : null
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-14 font-bold flex gap-2 text-white">
                <label htmlFor="L1" className="text-black size-6 mt-2">M1</label>
                    <Select
                        value={selectedCourseId}
                        onValueChange={(value) => {
                            setSelectedCourseId(value);
                            toggleTimetableDialog();
                        }}
                    >
                        <SelectTrigger className="bg-red-700 w-[180px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <SelectValue placeholder="M1" />
                        </SelectTrigger>
                        <SelectContent>
                            {(courseData.m1.length > 0)
                                ? courseData.m1.map((option) => (
                                    <SelectItem value={option.courseId} key={option.courseId}>{option.courseName}</SelectItem>
                                ))
                                : null
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-14 font-bold flex gap-2 text-white">
                <label htmlFor="L1" className="text-black size-6 mt-2">M2</label>
                    <Select
                        value={selectedCourseId}
                        onValueChange={(value) => {
                            setSelectedCourseId(value);
                            toggleTimetableDialog();
                        }}
                    >
                        <SelectTrigger className="bg-red-700 w-[180px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                            <SelectValue placeholder="M2" />
                        </SelectTrigger>
                        <SelectContent>
                            {(courseData.m2.length > 0)
                                ? courseData.m2.map((option) => (
                                    <SelectItem value={option.courseId} key={option.courseId}>{option.courseName}</SelectItem>
                                ))
                                : null
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Dialogue de l'emploi du temps à afficher */}
            <FreshTimetableDialog open={openTimetableDialog} onClose={toggleTimetableDialog} data={timetableData} />
        </>
    )
}

export default Contenue;
