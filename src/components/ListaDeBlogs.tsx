import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function ListaDeBlogs() {
    const direccionDeMisBlogs = 'src/blogs'
    const archivos = fs.readdirSync(path.join(direccionDeMisBlogs))

    const blogs = archivos.map((nombreDeArchivo) => {
        const contenidoDelArchivo = fs.readFileSync(path.join(direccionDeMisBlogs, nombreDeArchivo), "utf-8")

        const { data: frontMatter } = matter(contenidoDelArchivo)

        return {
            meta: frontMatter,
            slug: nombreDeArchivo.replace(".mdx", "")
        }
    })

    return (
        <main>
            <h1>Blogs de Roberto</h1>
            {
                blogs.map((blog, index) => (
                    <Link key={index} href={`/blogs/${blog.slug}`}>
                        <article>
                            <h1>{blog.meta.title}</h1>
                            <p>{blog.meta.description}</p>
                            <span>{blog.meta.date}</span>
                        </article>
                    </Link>
                ))
            }
        </main>
    )
}

export default ListaDeBlogs