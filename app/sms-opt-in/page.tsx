import type { Metadata } from "next"
import Link from "next/link"

import { ComplianceDocument } from "@/components/compliance-document"

export const metadata: Metadata = {
  title: "SMS Opt-In",
  description:
    "Verbal SMS opt-in and call-to-action workflow for Drew Sepeczi's missed-call assistant.",
  robots: { index: true, follow: true },
}

export default function SmsOptInPage() {
  return (
    <ComplianceDocument
      title="SMS Opt-In & Call-to-Action"
      effectiveDate="September 19, 2026"
    >
      <p>
        Drew Sepeczi&apos;s missed-call assistant uses{" "}
        <strong>verbal opt-in only</strong> for SMS sent to callers. We do not
        use purchased contact lists, and there is no pre-checked web form on
        this site that enrolls visitors in SMS.
      </p>

      <h2>Call-to-action workflow</h2>
      <ol>
        <li>
          A caller reaches the AI assistant on a Twilio number (
          <strong>+1 (888) 417-8537</strong> or{" "}
          <strong>+1 (224) 286-6565</strong>) or via a missed-call flow routed
          to that assistant.
        </li>
        <li>
          The AI discloses that it is an artificial intelligence assistant
          acting on behalf of Drew Sepeczi.
        </li>
        <li>
          The caller may ask to receive a text message, or Drew may receive
          owner-only summaries and alerts from the call (without texting the
          caller unless the caller opts in).
        </li>
        <li>
          <strong>Before any SMS is sent to the caller</strong>, the assistant
          reads the destination mobile number aloud and asks for permission to
          send a text to that number.
        </li>
        <li>
          The assistant sends a message <strong>only after</strong> the caller
          gives an explicit verbal &quot;yes&quot; (or equivalent clear
          affirmative consent).
        </li>
        <li>
          Outbound messages include opt-out instructions: reply{" "}
          <strong>STOP</strong> to opt out and <strong>HELP</strong> for help.
        </li>
      </ol>

      <h2>Message types</h2>
      <ul>
        <li>
          Missed-call summaries and follow-up information requested on the call
        </li>
        <li>
          Call-back or contact details the caller asked to receive by text
        </li>
        <li>
          Pet-sitting intake confirmations or notes the caller requested by SMS
        </li>
        <li>
          Other transactional texts directly related to the caller&apos;s
          request during the call
        </li>
      </ul>
      <p>
        Urgent alerts and owner-only summaries sent to Drew are not subscriber
        marketing messages to callers.
      </p>

      <h2>Frequency and rates</h2>
      <p>
        Message frequency varies depending on call activity and what the caller
        requests. Message and data rates may apply.
      </p>

      <h2>Sample message</h2>
      <p className="rounded-md border border-border bg-muted/30 p-4 font-mono text-sm text-foreground">
        Drew — missed call from +1 (555) 123-4567. Summary: Caller asked about
        pet-sitting next week. Reply STOP to opt out.
      </p>

      <h2>Related documents</h2>
      <p>
        <Link href="/privacy">Privacy Policy</Link> ·{" "}
        <Link href="/terms">Terms of Service</Link>
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:drewsepeczi@gmail.com">drewsepeczi@gmail.com</a>
      </p>
    </ComplianceDocument>
  )
}
