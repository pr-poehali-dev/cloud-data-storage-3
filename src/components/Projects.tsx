import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Кухня «Скандинавия»",
    category: "Минимализм",
    location: "Москва, Хамовники",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/d01981ee-5d5c-43d2-a45b-911a42ef96ec/files/642b8a22-3dfe-467a-b80e-0c16ac5dec0b.jpg",
  },
  {
    id: 2,
    title: "Кухня «Лофт»",
    category: "Современный стиль",
    location: "Москва, Красная Пресня",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/d01981ee-5d5c-43d2-a45b-911a42ef96ec/files/34efe3cc-258c-4112-83fc-1542d78ee506.jpg",
  },
  {
    id: 3,
    title: "Кухня «Классика»",
    category: "Классический стиль",
    location: "Подмосковье, Рублёво",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/d01981ee-5d5c-43d2-a45b-911a42ef96ec/files/ee74eb9a-87db-4eb6-83da-692afdbbd006.jpg",
  },
  {
    id: 4,
    title: "Кухня «Шале»",
    category: "Деревенский стиль",
    location: "Москва, Крылатское",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/d01981ee-5d5c-43d2-a45b-911a42ef96ec/files/1fb40951-c458-4932-b4d7-43480569c40b.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Реализованные проекты</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Заказать кухню
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}