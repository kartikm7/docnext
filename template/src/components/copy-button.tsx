'use client'

import { useState } from 'react'
import { ClipboardIcon, CheckIcon } from 'lucide-react'
import { Button } from './ui/button'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      onClick={copyToClipboard}
      size={'icon'}
      variant={'secondary'}
      className='scale-75 m-0'
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      {isCopied ? (
        <CheckIcon className="text-green-500 text-xl" />
      ) : (
        <ClipboardIcon className="text-xl" />
      )}
    </Button>
  )
}