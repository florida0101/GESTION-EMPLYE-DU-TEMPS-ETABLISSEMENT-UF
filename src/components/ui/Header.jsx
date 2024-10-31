import React from "react";

function Header() {

  return (
    <nav className="bg-green-950  ">
      <div className="flex flex-wrap  justify-between mx-auto p-4 text-white font-bold">
        <div className="flex gap-2">
          <img src="images/logo-eni.png" alt="" className="w-9 h-9"/> 
          <span className="my-2">GESTION D'EMPLOI DU TEMPS UF (ENI)</span>
        </div>
      </div>
    </nav>
  )
}

export default Header;