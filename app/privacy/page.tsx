import type { Metadata } from "next"
import Link from "next/link"

import { ComplianceDocument } from "@/components/compliance-document"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Drew Sepeczi's AI missed-call assistant and SMS program.",
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <ComplianceDocument
      title="Privacy Policy"
      effectiveDate="September 19, 2026"
    >
      <p>
        This Privacy Policy describes how <strong>Drew Sepeczi</strong> (sole
        proprietor) collects, uses, and protects information in connection with
        Drew&apos;s AI missed-call assistant and related SMS messaging program
        operated through Twilio phone numbers <strong>+1 (888) 417-8537</strong>{" "}
        and <strong>+1 (224) 286-6565</strong>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Caller phone numbers</li>
        <li>
          Call metadata (such as date, time, duration, and routing details)
        </li>
        <li>
          Message content, including call summaries, urgent alerts, pet-sitting
          intake notes, and text messages sent to callers who have given
          explicit verbal consent
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>
          To generate call summaries and send urgent alerts to Drew Sepeczi
        </li>
        <li>To capture pet-sitting intake notes from inbound calls</li>
        <li>
          To send text messages to callers{" "}
          <strong>only after explicit verbal consent</strong> is obtained on the
          phone call (see our <Link href="/sms-opt-in">SMS Opt-In</Link> page)
        </li>
        <li>
          To operate, secure, and improve the missed-call assistant service
        </li>
      </ul>

      <h2>SMS and mobile information</h2>
      <p>
        Message frequency varies depending on call activity and your requests.
        Message and data rates may apply.
      </p>
      <p>
        Mobile information and messaging consent will not be shared with third
        parties or affiliates for marketing or promotional purposes.
      </p>
      <p>
        We may share information with service providers (such as Twilio) solely
        to deliver the messaging and telephony services described here, not for
        their independent marketing use.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          <strong>Opt out of SMS:</strong> Reply <strong>STOP</strong> to any
          message from this program.
        </li>
        <li>
          <strong>Help:</strong> Reply <strong>HELP</strong> for assistance.
        </li>
        <li>
          <strong>Contact:</strong> Email{" "}
          <a href="mailto:drewsepeczi@gmail.com">drewsepeczi@gmail.com</a> with
          privacy questions or requests.
        </li>
      </ul>

      <h2>Related documents</h2>
      <p>
        Please also review our <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/sms-opt-in">SMS Opt-In / Call-to-Action workflow</Link>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The effective date at the
        top of this page indicates when it was last revised.
      </p>
    </ComplianceDocument>
  )
}
