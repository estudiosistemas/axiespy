"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    ColumnDef, createColumnHelper,

  } from "@tanstack/react-table"


export type Jugador = {
  userID: string
  topRank: number
  name: string
  lastBattle: number
  axie1: number
  axie2: number
  axie3: number
}

const columnHelper = createColumnHelper<Jugador>()

export const columns: ColumnDef<Jugador>[] = [
   
    {
      accessorKey: "topRank",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Top
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("topRank")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Player
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "lastBattle",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Battle (min)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>
        {row.getValue("lastBattle")}</div>
      ,
    },
    columnHelper.group({
      header: 'Team',
      columns: [
        // Accessor Column
        columnHelper.accessor('axie1', {
          header: () => '',
          cell: props => (
            <img src={`https://axiecdn.axieinfinity.com/axies/${props.getValue()}/axie/axie-full-transparent.png`} alt="background image" height={80} width={80} className="w-20"/>
          ),
          footer: props => props.column.id,
        }),
        // Accessor Column
        columnHelper.accessor('axie2', {
          header: '',
          cell: props => (
            <img src={`https://axiecdn.axieinfinity.com/axies/${props.getValue()}/axie/axie-full-transparent.png`} alt="background image" height={80} width={80} className="w-20"/>
          ),
          footer: props => props.column.id,
        }),
        // Accessor Column
        columnHelper.accessor('axie3', {
          header: '',
          cell: props => (
            <img src={`https://axiecdn.axieinfinity.com/axies/${props.getValue()}/axie/axie-full-transparent.png`} alt="background image" height={80} width={80} className="w-20"/>
          ),
          footer: props => props.column.id,
        }),
      ],
    }),
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const jugador = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(jugador.userID)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
