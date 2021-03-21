import React, { ReactNode, useContext } from "react"
import {
  CreateBookmarkPanel,
  EditBookmarkPanel,
} from "~/components/panels/create"
import { SavePanel } from "~/components/panels/save"
import { LayoutContext } from "~/context"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  const layoutContext = useContext(LayoutContext)
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row overflow-hidden max-h-full">
        {layoutContext.sidebarOpen && <Sidebar />}
        <div className="border flex-grow overflow-y-scroll mb-14 h-screen">
          {children}
        </div>
        {layoutContext.createPanelOpen && <CreateBookmarkPanel />}
        {layoutContext.editPanelOpen && <EditBookmarkPanel />}
        {layoutContext.savePanelOpen && <SavePanel />}
      </div>
    </div>
  )
}
