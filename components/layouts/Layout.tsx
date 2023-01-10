import React, { useState } from "react"
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, toggleSidebar] = useState(false)

  return (
    <div className="flex">
      <Header show={showSidebar} toggleSidebar={toggleSidebar} />
      <Sidebar show={showSidebar} />

      <div className="flex mt-24 lg:ml-72 px-4 py-4 lg:px-4 lg:py-4 w-full h-full items-center">
        {children}
      </div>
    </div>
  )
}
