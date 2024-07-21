import React from 'react'
import Link from 'next/link'
import { SiImagedotsc, SiApachespark, SiTwitter, SiSafari } from 'react-icons/si'
import { Button } from './ui/button'
// https://react-icons.github.io/react-icons/icons/si/

const Footer: React.FC = () => {
  return (
   <footer className="w-fit p-1 md:p-2 fixed bottom-0 right-0">
      <div className="flex justify-center">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="itext-muted-foreground/50"
        >
          <Link href="https://toolify.jiehuo.ai/" target="_blank">
            <SiImagedotsc size={18} />
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="1text-muted-foreground/50"
        >
          <Link href="https://toolify.jiehuo.ai/" target="_blank">
            <SiApachespark size={18} />
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="1text-muted-foreground/50"
        >
          <Link href="https://www.jiehuo.ai/baike" target="_blank">
            <SiSafari size={18} />
          </Link>
        </Button>
      </div>
    </footer> 
  )
}

export default Footer
