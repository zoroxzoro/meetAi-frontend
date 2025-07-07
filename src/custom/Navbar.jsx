import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import CommandBox from './CommandBox'

const Navbar = () => {
    const [openCommand, setOpenCommand] = useState(false)
    return (
        <>
            <CommandBox openCommand={openCommand} setOpenCommand={setOpenCommand} />
            <nav className='flex flex-row px-4 gap-x-2 items-center py-3 border-b bg-background'>
                <SidebarTrigger className="absolute top-4 left-4 z-50" />
                <div className='ml-9'>
                    <Button onClick={() => setOpenCommand((open) => !open)}
                        variant={'outline'} className={'h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground '}>
                        <SearchIcon />
                        Search
                        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                            <span>
                                &#8984;
                            </span>
                            K
                        </kbd>
                    </Button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
