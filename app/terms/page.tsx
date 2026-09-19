import type { Metadata } from "next"
import Link from "next/link"

import { ComplianceDocument } from "@/components/compliance-document"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Drew Sepeczi's SMS and missed-call assistant program.",
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <ComplianceDocument
      title="Terms of Service"
      effectiveDate="September 19, 2026"
    >
      <p>
        These Terms of Service apply to the SMS messaging program operated by{" "}
        <strong>Drew Sepeczi</strong> (sole proprietor) in connection with
        Drew&apos;s AI missed-call assistant on Twilio numbers{" "}
        <strong>+1 (888) 417-8537</strong> and{" "}
        <strong>+1 (224) 286-6565</strong>.
      </p>

      <h2>SMS program scope</h2>
      <p>The program may send or facilitate messages related to:</p>
      <ul>
        <li>Missed-call follow-up and call summaries</li>
        <li>Urgent alerts to Drew Sepeczi</li>
        <li>Pet-sitting intake information</li>
        <li>
          Text messages to callers who request them and who provide explicit
          verbal consent during the phone call
        </li>
      </ul>

      <h2>Consent (not bundled)</h2>
      <p>
        Consent to receive SMS from this program is obtained{" "}
        <strong>
          directly and separately via verbal opt-in on the phone call
        </strong>
        . It is not buried in general website terms and is not bundled with
        unrelated agreements. Agreeing to these website terms does not by itself
        enroll you in SMS messaging.
      </p>
      <p>
        Before texting a caller, the assistant{" "}
        <strong>
          confirms the destination mobile number aloud and waits for an explicit
          &quot;yes&quot;
        </strong>{" "}
        (or equivalent clear affirmative consent). See the step-by-step process
        on our <Link href="/sms-opt-in">SMS Opt-In</Link> page.
      </p>

      <h2>Message frequency and charges</h2>
      <p>
        Message frequency varies. Message and data rates may apply. Reply{" "}
        <strong>STOP</strong> to opt out or <strong>HELP</strong> for help.
      </p>

      <h2>Not for emergencies</h2>
      <p>
        This service and SMS program are <strong>not for emergencies</strong>.
        If you need immediate help, call <strong>911</strong> (or your local
        emergency number).
      </p>

      <h2>Related documents</h2>
      <p>
        See our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/sms-opt-in">SMS Opt-In</Link> documentation for how
        information is collected and how consent is obtained.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:drewsepeczi@gmail.com">drewsepeczi@gmail.com</a>.
      </p>
    </ComplianceDocument>
  )
}
