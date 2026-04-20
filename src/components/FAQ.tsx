import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит кухня на заказ?",
    answer:
      "Стоимость зависит от размеров, материалов и фурнитуры. Средняя кухня 3–4 метра обходится от 80 000 рублей. Точную цену рассчитаем бесплатно после замера и согласования проекта.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартный срок производства — 3–5 недель с момента подписания договора. Для кухонь со сложными фасадами или нестандартными материалами — до 7 недель. Мы всегда согласовываем точные сроки заранее.",
  },
  {
    question: "Вы работаете только в Москве?",
    answer:
      "Основная зона работы — Москва и Московская область. Выезд на замер, доставку и монтаж включены в стоимость в пределах МКАД. За пределы МКАД — по согласованию.",
  },
  {
    question: "Можно ли приехать посмотреть образцы?",
    answer:
      "Да! Приглашаем вас в наш шоурум, где представлены образцы фасадов, столешниц и фурнитуры. Адрес и время работы — по запросу через форму обратной связи.",
  },
  {
    question: "Какую гарантию вы даёте?",
    answer:
      "Мы даём письменную гарантию 5 лет на корпуса и фасады и 2 года на фурнитуру. При гарантийном случае выезжаем бесплатно.",
  },
  {
    question: "Как начать работу?",
    answer:
      "Оставьте заявку или позвоните нам. Мы согласуем удобное время, выедем на замер, подготовим 3D-проект и коммерческое предложение — всё бесплатно и без обязательств.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
