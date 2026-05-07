import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

const CareerConsultantContent = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Independent Consultant — Full-Stack Developer</h3>
          <p className='text-muted-foreground text-sm'>
            Remote — October 2025 to February 2026
          </p>
          <p className='text-muted-foreground text-sm'>
            Built SlotFlow, a multi-tenant event management platform with AI-powered scheduling optimization.
          </p>
        </div>

        <Link
          href="https://slotflow.fit"
          target="_blank"
          rel="noopener noreferrer"
          className='inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted'
        >
          <ExternalLink className='h-3.5 w-3.5' />
          slotflow.fit
        </Link>

        <Accordion type='multiple' className='-mt-2 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-5'>
              <Badge className='h-6 rounded-sm border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'>
                SlotFlow Platform
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                <li>Multi-tenant event management with automated billing, scheduling, reminders</li>
                <li>AI-powered event optimization reducing admin overhead by 50%</li>
                <li>Customer automation workflows (chatbots, automated emails)</li>
                <li>Increased user engagement and retention metrics</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-5'>
              <Badge className='h-6 rounded-sm border-none bg-sky-600/10 text-sky-600 focus-visible:ring-sky-600/20 focus-visible:outline-none dark:bg-sky-400/10 dark:text-sky-400 dark:focus-visible:ring-sky-400/40 [a&]:hover:bg-sky-600/5 dark:[a&]:hover:bg-sky-400/5'>
                Architecture
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                <li>Complex domain logic for event optimization</li>
                <li>Multi-tenancy with data isolation</li>
                <li>Automated workflow engine</li>
                <li>Integration with external calendar and billing systems</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-5'>
              <Badge className='h-6 rounded-sm border-none bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-orange-400/10 dark:text-orange-400 dark:focus-visible:ring-orange-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-orange-400/5'>
                AI Integration
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                <li>LLM integration for intelligent scheduling</li>
                <li>RAG pipelines for contextual recommendations</li>
                <li>Automated planning and optimization algorithms</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default CareerConsultantContent
