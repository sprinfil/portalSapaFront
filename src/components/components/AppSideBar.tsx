import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { FaUser, FaMapMarkedAlt, FaClipboardList } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineExitToApp } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import ZustandPrincipal from "@/Zustand/ZustandPrincipal";
import { SideBarMenuCollapsibleButton, SideBarMenuCollapsibleIcon, SideBarMenuCollapsibleIconButton } from "./SideBarMenuCollapsibleIconButton";
import logo from "../../assets/SAPALOGO.png"
import { FaNewspaper } from "react-icons/fa6";

export function AppSidebar() {
  const navigate = useNavigate();
  const { user } = ZustandPrincipal();
  const iconStlyes = "text-primary";

  // const items = [
  //   {
  //     title: "Home",
  //     url: "/",
  //     icon: <IoHome className={iconStlyes} />,
  //   },
  //   {
  //     title: "Cargas de trabajo (predios)",
  //     url: "/cargasTrabajo",
  //     icon: <FaClipboardList className={iconStlyes} />,
  //   },
  //   {
  //     title: "Mapas",
  //     icon: <FaMapMarkedAlt />,
  //     options: [
  //       { title: "Mapa Predios", url: "/mapa", icon: <FaMapMarkedAlt /> },
  //       { title: "Mapa Válvulas", url: "/mapaValvulas", icon: <FaMapMarkedAlt /> },
  //     ],
  //   },
  //   {
  //     title: "Recorridos",
  //     icon: <FaClipboardList />,
  //     options: [
  //       { title: "Recorrido 1", url: "/recorrido1", icon: <FaClipboardList /> },
  //       { title: "Recorrido 2", url: "/recorrido2", icon: <FaClipboardList /> },
  //     ],
  //   },
  // ];

  const items = [

    //ITEMS PARA USUARIOS 
    {
      title: "Inicio",
      url: "/",
      icon: <IoHome className={iconStlyes} />,
    },
    {
      title: "Factibilidad",
      url: "/factibilidadDashboard",
      icon: <FaNewspaper className={iconStlyes} />,
    },
    //TERMINA ITEMOS PARA USUARIOS

    //ITEMS OPERADORES
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <div className="w-full flex items-center justify-center">
          <img src={logo} alt="" className="w-[100px]" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.options) {
                  // Renderizar Collapsible para elementos con opciones
                  return (
                    <Collapsible
                      key={item.title}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="relative">
                            <span className={iconStlyes}>{item.icon}</span>  {item.title} <SideBarMenuCollapsibleIconButton />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.options.map((option) => (
                              <SidebarMenuSubItem key={option.title}>
                                <SidebarMenuButton
                                  onClick={() => navigate(option.url)}
                                >
                                  <span className={iconStlyes}>{option.icon}</span> {option.title}
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => navigate(item.url)}
                      className="cursor-pointer select-none"
                    >
                      <div>
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <FaUser className={iconStlyes} /> {user?.name} ({user?.username})
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.setItem("TOKEN", "");
                    navigate("/login");
                  }}
                >
                  <div className="h-[40px] flex gap-2 items-center text-red-500 cursor-pointer">
                    <MdOutlineExitToApp />
                    Cerrar Sesión
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
