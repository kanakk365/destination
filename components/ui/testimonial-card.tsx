import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
  initials?: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "div"

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-blue-900/20 to-blue-900/5",
        "p-4 text-start sm:p-6",
        "hover:from-blue-900/30 hover:to-blue-900/10",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback className="bg-blue-500/20 text-blue-300">
            {author.initials || author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-white">{author.name}</h3>
          <p className="text-sm text-blue-300">{author.handle}</p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-gray-300">{text}</p>
    </Card>
  )
}
