"use client"
import { createContext, useState } from "react"

export const userContext = createContext({} as any)

export function UserProvider({children}: {children: React.ReactNode }) {
    const [user, setUser] = useState()

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

