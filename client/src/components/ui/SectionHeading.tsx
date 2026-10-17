type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">{title}</h2>
      {description && <p className="text-base text-text-muted">{description}</p>}
    </div>
  )
}
