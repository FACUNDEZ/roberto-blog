import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"

// GENERAR ESTATICAMENTE LAS RUTAS DE TODOS LOS BLOGS

export function generateStaticParams() {
    const archivos = fs.readdirSync(path.join("src/blogs"))

    const rutas = archivos.map((nombreDeArchivo) => {
        slug: nombreDeArchivo.replace(".mdx", "")
    })

    return rutas
}

function obtenerBlog({ slug }: { slug: string }) {
    const archivoDelBlog = fs.readFileSync(path.join("src/blogs/" + slug + ".mdx"), "utf-8")

    const { data: frontMatter, content } = matter(archivoDelBlog)

    return { metadatos: frontMatter, slug, content }
}

// MOSTRAR BLOG EN SU RESPECTIVA PAGINA

export default function Page({ params }: { params: { slug: string } }) {

    const blog = obtenerBlog(params)

    return (
        <>
        <Link href="/">Volver</Link>
            <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
                <h1>{blog.metadatos.title}</h1>
                <MDXRemote source={blog.content}></MDXRemote >
            </article>
        </>
    )
}