import React, { useState } from "react";
import Footer from "./ui/footer";
import { Button } from "./ui/button";
import Tableau from "./Tableau";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import Adding from "./Adding";
//import Update from "./Update";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import './style.css';
import { FaPlusCircle } from 'react-icons/fa';
import { fetchFilteredCourses, fetchFilteredPrograms } from './requests'


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
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Body() {
  const [dataOptions, setDataOptions] = useState([]);
  const [dataParcours, setDataParcours] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [programData, setProgramData] = useState([]);
  const [openAdding, setOpenAdding] = useState(false);
  const [openUpdating, setOpenUdating] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDisconnect = () => {
    setOpen(false);
    navigate('/');
  };

  useEffect(() => {
    fetchFilteredCourses()
      .then(value => setDataOptions(value))
  }, []);

  useEffect(() => {
    fetchFilteredPrograms(dataParcours, dateFilter.startDate, dateFilter.endDate)
      .then(value => setProgramData(value))
  }, [dataParcours, dateFilter.startDate, dateFilter.endDate]);

  return (
    <div className="w-full">
      <nav className="bg-green-950  ">
        <div className="flex flex-wrap  justify-between mx-auto p-4 text-white font-bold">
          <div className="flex gap-2">
            <img src="images/logo-eni.png" alt="" className="w-9 h-9" />
            <p className="my-2">GESTION D'EMPLOI DU TEMPS UF(ENI)</p>
          </div>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTrigger className="my-2" onClick={handleClickOpen}>Se déconnecter</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Déconnexion</DialogTitle>
                  <DialogDescription>
                    Voulez-vous vraiment se déconnecter?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className='bg-red-500 text-white hover:bg-red-700' type="button" onClick={handleDisconnect}>Ok</Button>
                  <Button type="button" onClick={handleClose}>Annuler</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <div className="my-24">
        <div className="flex justify-end gap-4 mr-80">

          <div className="flex gap-4 mr-auto ml-80">
            <div>
              <Select
                value={dataParcours}
                onValueChange={(value) => {
                  setDataParcours(value)
                }}
              >
                <SelectTrigger className="w-[200px]" >
                  <SelectValue placeholder="Sélectioner un parcours" />
                </SelectTrigger>
                <SelectContent>
                  {(dataOptions.length > 0)
                    ? dataOptions.map((option) => (
                      <SelectItem value={option.courseId} key={option.courseId}>{option.rankLevel} - {option.courseName}</SelectItem>
                    ))
                    : null}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-1">
              <Label className="mt-5" htmlFor="début">Début</Label>
              <Input type="date" value={dateFilter.startDate} onChange={(dateDebut) => setDateFilter({ ...dateFilter, startDate: dateDebut.target.value })} />
            </div>
            <div className="flex gap-1">
              <Label className="mt-5">Fin</Label>
              <Input type="date" value={dateFilter.endDate} onChange={(dateFin) => setDateFilter({ ...dateFilter, endDate: dateFin.target.value })} />
            </div>
          </div>
          <div className="flex gap-3">
            <FaPlusCircle onClick={() => (dataParcours != '') ? setOpenAdding(true) : null} className="fill-blue-900" size={48} />
          </div>
        </div>
        <div className="w-2/3 mt-4 border rounded-lg shadow-2xl mx-auto bg-white">
          {(programData.length > 0) ?
            <Tableau data={programData} />
            : <div className="text-center w-full text-yellow-500 bg-yellow-100/20 p-4">Veuillez entrer nouveau programme en choisissant un parcours ou patienter un peu!</div>
          }
        </div>
      </div>
      < Footer />
      
      <Adding open={openAdding} onClose={() => setOpenAdding(false)} parcours={dataParcours} />
    </div>
  );
}

export default Body; // Exportez le composant Body avec `export default`