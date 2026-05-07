import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const CareerPresentContent = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Founder & Lead Software Engineer</h3>
          <p className='text-muted-foreground text-sm'>
            Phoenix Agency — June 2025 to Present
          </p>
          <p className='text-muted-foreground text-sm'>
            Architected and launched phoenixdev.agency, a digital marketplace for SaaS boilerplates. 
            Building production-ready starter kits that save founders $10,000+ in initial development costs.
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <Link
            href="https://phoenixdev.agency"
            target="_blank"
            rel="noopener noreferrer"
            className='inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted'
          >
            <ExternalLink className='h-3.5 w-3.5' />
            phoenixdev.agency
          </Link>
          <Link
            href="https://github.com/drewsephski/nodebase"
            target="_blank"
            rel="noopener noreferrer"
            className='inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted'
          >
            <Star className='h-3.5 w-3.5' />
            NodeBase
          </Link>
        </div>

        <Accordion type='multiple' className='-mt-2 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-5'>
              <Badge className='h-6 rounded-sm border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'>
                Impact
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                <li>SaaS boilerplate marketplace saving founders weeks of setup time</li>
                <li>Starter kits with auth, multi-tenancy, Stripe billing, RBAC</li>
                <li>NodeBase open-source workflow automation platform</li>
                <li>Astra SaaS template — Top 15 Product Hunt of the Day</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-5'>
              <Badge className='h-6 rounded-sm border-none bg-sky-600/10 text-sky-600 focus-visible:ring-sky-600/20 focus-visible:outline-none dark:bg-sky-400/10 dark:text-sky-400 dark:focus-visible:ring-sky-400/40 [a&]:hover:bg-sky-600/5 dark:[a&]:hover:bg-sky-400/5'>
                Tech Stack
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                <li>Next.js, TypeScript, Tailwind CSS</li>
                <li>PostgreSQL, Supabase, Redis</li>
                <li>Stripe API for billing & subscriptions</li>
                <li>AWS S3, Lambda, Docker, CI/CD</li>
                <li>LLM integration (OpenAI/Anthropic)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-5'>
              <Badge className='h-6 rounded-sm border-none bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-orange-400/10 dark:text-orange-400 dark:focus-visible:ring-orange-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-orange-400/5'>
                Client Work
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                <li>
                    Building AI agents and automations
                </li>
                <li>Multiple SaaS MVP launches for startup clients</li>
                <li>60%+ reduction in client development time</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default CareerPresentContent
