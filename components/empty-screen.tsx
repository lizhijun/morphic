import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: '什么是AGI?',
    message: '什么是AGI?'
  },
  {
    heading: '为什么科技从业者喜欢费曼?',
    message: '为什么科技从业者喜欢费曼?'
  },
  {
    heading: '基于AI的搜索引擎工作原理?',
    message: '基于AI的搜索引擎工作原理?'
  },
  {
    heading: '比较Google和Perplexity',
    message: '比较Google和Perplexity'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
