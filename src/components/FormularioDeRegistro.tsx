"use client"
import { FormEvent, useRef } from "react"
import { useContext } from "react"
import { userContext } from "@/context/UserContext"
import { verify } from "jsonwebtoken"
import Link from "next/link"

function FormularioDeRegistro() {
    const nombreRef = useRef(null)
    const edadRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const { user, setUser } = useContext(userContext)

    async function mandarDatosDeRegistro(evento: FormEvent) {
        evento.preventDefault()

        const datosAEnviar = {
            //@ts-ignore
            nombre: nombreRef.current?.value,
            //@ts-ignore
            edad: Number(edadRef.current?.value),
            //@ts-ignore
            email: emailRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value
        }

        console.log(datosAEnviar)

        const respuesta = await fetch("http://localhost:3000/api/usuarios/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(datosAEnviar)
        })

        if (respuesta.status !== 201) {
            const error = await respuesta.json()
            alert(error.msg)
        }

        const { token } = await respuesta.json();

        setUser({ ...datosAEnviar, token });


        // const token = await respuesta.text()

        // const decodificado = verify(token as string, process.env.NEXT_PUBLIC_TOKEN_SECRET as string)

        // console.log(decodificado)
    }

    return (
        <>
            <form onSubmit={mandarDatosDeRegistro} className="text-black">
                <input ref={nombreRef} type="text" placeholder="Nombre" />
                <input ref={edadRef} type="number" inputMode="numeric" placeholder="Edad" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Contraseña" />
                <input className="text-white" type="submit" value="Registrarse" />
            </form>

            <button onClick={() => console.log(user)}>Click</button>


            <Link href="/perfil">Ir a Perfil</Link>
        </>
    )
}

export default FormularioDeRegistro