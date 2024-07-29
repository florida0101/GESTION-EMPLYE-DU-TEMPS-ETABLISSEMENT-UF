import React from "react";
import { Button } from "./button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function Header() {

  return (
    <nav className="bg-green-950  ">
      <div className="flex flex-wrap  justify-between mx-auto p-4 text-white font-bold">
        <div className="flex gap-2">
          <img src="images/logo-eni.png" alt="" className="w-9 h-9"/> 
          <span className="my-2">ENI TIME EMPLOYEE MANAGEMENT</span>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="my-2">New E.T</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">Login</DialogTitle>
                <DialogDescription>
                 Enter your username and Password  for accessing in New E.T 
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-bold">
                    Username
                  </Label>
                  <Input
                    id="username"  
                    placeholder="Enter your username"            
                    className="col-span-3 placeholder-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right font-bold">
                    Password
                  </Label>
                  <Input
                    id="Password"
                    placeholder="Enter your Password"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="Nouveau E.T">Login</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  )
}

export default Header;