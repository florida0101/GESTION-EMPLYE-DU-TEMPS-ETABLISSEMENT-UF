import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { fetchWeekDays } from "./requests";
import { useEffect } from "react";
import isEqual from "react-fast-compare";
import SuccessDialog from "./SuccessDialog";
import { createNewPrograms } from './requests'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"


const isAllFieldsNotEmpty = (data) => {
    return (data.startTime && data.week.weekId && data.moduleName && data.endTime) ? true : false;
}

function Adding({ parcours, open, onClose }) {
    const [schedules, setSchedules] = useState([]);
    const [selectWeek, setSelectWeek] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [saveFormat, setSaveFormat] = useState({
        moduleName: '',
        date: '',
        startTime: '',
        endTime: '',
        course: {
            courseId: parcours,
        },
        week: {
            weekId: ''
        }
    })

    const handleSavingFieldsValue = () => {
        if (isAllFieldsNotEmpty(saveFormat)) {
            const newSchedule = {
                moduleName: saveFormat.moduleName,
                date: saveFormat.date,
                startTime: saveFormat.startTime,
                endTime: saveFormat.endTime,
                course: {
                    courseId: parcours,
                },
                week: {
                    weekId: saveFormat.week.weekId,
                },
            };

            // Vérifie si schedule existe déjà sinon ajouté dans liste schedules
            if (schedules.length > 0) {
                schedules.map((s) => {
                    (!isEqual(s, newSchedule)) ? setSchedules([...schedules, newSchedule]) : null;
                })
            } else {
                setSchedules([...schedules, newSchedule]);
            }
        }
    };

    const handleSendingNewPrograms = async (event) => {
        event.preventDefault();
        const response = createNewPrograms(schedules);

        if (response) {
            //console.log('Données envoyées est avec succès!', response);
            setOpenSuccess(true);
            onClose();
        }
    }

    useEffect(() => {
        fetchWeekDays()
        .then(value => setSelectWeek(value));
    }, []);

    return (
        <div>
            <SuccessDialog open={openSuccess} onClose={() => setOpenSuccess(false)} />

            <Dialog open={open}>
                <DialogContent className="max-w-3xl">
                    <form onSubmit={handleSendingNewPrograms}>
                        <DialogHeader>
                            <DialogTitle>Adding New E.T</DialogTitle>
                            <div className="flex  justify-end gap-20 ">
                                {schedules.length > 0 && (
                                    <div className="day-list">
                                        <h2>Liste d'enregistrement</h2>
                                        <ul>
                                            {(schedules.length > 0)
                                                ? schedules.map((schedule) => (
                                                    <li key={schedule.week.weekId}>
                                                        {schedule.moduleName} ({schedule.startTime} - {schedule.endTime}) {schedule.date}
                                                    </li>
                                                ))
                                                : (<li className="text-red-500 bg-red-200 px-2 rounded">Liste vide.</li>)}
                                        </ul>
                                    </div>
                                )}
                                <div className="grid gap-4  w-[150px]">
                                    <div>
                                        <Label htmlFor="date" className="font-bold">Date de Début</Label>
                                        <Input type="date" name="date"
                                            required
                                            value={saveFormat.date}
                                            onChange={(dateDebut) => setSaveFormat({ ...saveFormat, date: dateDebut.target.value })} />
                                    </div>
                                    <div>
                                        <Label htmlFor="jour" className="font-bold">jour</Label>
                                        <Select name="week"
                                            required
                                            value={saveFormat.week.weekId}
                                            onValueChange={(weekDay) => {
                                                setSaveFormat({ ...saveFormat, week: { weekId: weekDay } })
                                            }}>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Sélectionner jour" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(selectWeek.length > 0)
                                                    ? selectWeek.map((week) => (
                                                        <SelectItem value={week.weekId} key={week.weekId}>{week.weekday}</SelectItem>
                                                    ))
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="module" className="font-bold">module</Label>
                                        <Input type="text" placeholder="Module" name="moduleName"
                                            value={saveFormat.moduleName}
                                            onChange={(moduleName) => setSaveFormat({ ...saveFormat, moduleName: moduleName.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 w-[150px]">
                                    <div>
                                        <Label htmlFor="début" className="font-bold">Début de cours</Label>
                                        <Input type="time" name="debutCours"
                                            value={saveFormat.startTime}
                                            onChange={(debutCours) => setSaveFormat({ ...saveFormat, startTime: debutCours.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="fin" className="font-bold">Fin du Début</Label>
                                        <Input type="time" name="finCours"
                                            value={saveFormat.endTime}
                                            onChange={(finCours) => setSaveFormat({ ...saveFormat, endTime: finCours.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter className="mt-9">
                            <Button type="button" className="transition ease-in-out delay-150 bg-blue-900 hover:bg-green-950 hover:-translate-y-1 hover:scale-110 duration-300 ..." onClick={handleSavingFieldsValue}>Save</Button>
                            <Button type="submit" className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-950 duration-300 ...">Save All</Button>
                            <Button type="button" className="transition ease-in-out delay-150 bg-red-700 hover:-translate-y-1 hover:scale-110 hover:bg-green-950 duration-300 ..." onClick={onClose}>Close</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Adding;
