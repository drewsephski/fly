"use client"

import { useState } from "react"
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight } from "lucide-react"

import styles from "./directions.module.css"

const directions = [
  {
    id: "field-notes",
    number: "01",
    name: "Field notes",
    premise:
      "An editorial case-file portfolio that makes decisions and outcomes the proof.",
    bestFor:
      "Hiring teams who want to understand how you think before they skim the stack.",
  },
  {
    id: "flight-deck",
    number: "02",
    name: "Flight deck",
    premise:
      "A high-contrast operating surface that frames every project as a live system.",
    bestFor:
      "Founders looking for an engineer who can take product ownership end to end.",
  },
  {
    id: "workbench",
    number: "03",
    name: "Workbench",
    premise:
      "A tactile studio portfolio where the work itself carries the visual energy.",
    bestFor:
      "Creative collaborators who want a distinct, approachable personal brand.",
  },
] as const

type DirectionId = (typeof directions)[number]["id"]

export default function DirectionsPage() {
  const [selected, setSelected] = useState<DirectionId>("field-notes")
  const direction = directions.find((item) => item.id === selected)!

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="/" aria-label="Back to portfolio">
          Drew Sepeczi<span>.</span>
        </a>
        <p>Portfolio directions / spring 2026</p>
      </header>

      <section className={styles.intro} aria-labelledby="directions-title">
        <div>
          <p className={styles.eyebrow}>A decision surface</p>
          <h1 id="directions-title">Three ways the work could lead.</h1>
        </div>
        <p>
          Each route uses the same material, but changes what arrives first:
          your judgment, your systems thinking, or your visual point of view.
        </p>
      </section>

      <section
        className={styles.chooser}
        aria-label="Choose a portfolio direction"
      >
        {directions.map((item) => (
          <button
            className={`${styles.choice} ${selected === item.id ? styles.choiceActive : ""}`}
            type="button"
            key={item.id}
            aria-pressed={selected === item.id}
            onClick={() => setSelected(item.id)}
          >
            <span>{item.number}</span>
            <strong>{item.name}</strong>
            <ChevronRight aria-hidden="true" />
          </button>
        ))}
      </section>

      <section className={styles.detail} aria-live="polite">
        <div>
          <p className={styles.eyebrow}>The idea</p>
          <h2>{direction.name}</h2>
          <p>{direction.premise}</p>
        </div>
        <div>
          <p className={styles.eyebrow}>Best fit</p>
          <p>{direction.bestFor}</p>
        </div>
      </section>

      <div className={styles.stage}>
        {selected === "field-notes" && <FieldNotes />}
        {selected === "flight-deck" && <FlightDeck />}
        {selected === "workbench" && <Workbench />}
      </div>
    </main>
  )
}

function FieldNotes() {
  return (
    <article
      className={`${styles.preview} ${styles.fieldNotes}`}
      aria-label="Field notes portfolio direction"
    >
      <nav>
        <b>DS / 26</b>
        <span>Selected work</span>
        <span>Writing</span>
        <span>About</span>
        <a href="mailto:drewsepeczi@gmail.com">
          Start a project <ArrowUpRight />
        </a>
      </nav>
      <div className={styles.fieldHero}>
        <p>
          Independent product engineer
          <br />
          Chicago, Illinois
        </p>
        <h2>
          Useful software,
          <br />
          <em>under real pressure.</em>
        </h2>
        <div>
          <p>
            I help founders turn a sharp idea into a product that earns its
            place in someone&apos;s day.
          </p>
          <a href="#case">
            Read the case files <ArrowDownRight />
          </a>
        </div>
      </div>
      <section id="case" className={styles.fieldCase}>
        <p>Case file / 001</p>
        <div>
          <h3>Vault Zero</h3>
          <p>A private command center for the work that matters most.</p>
        </div>
        <div>
          <span>What changed</span>
          <strong>
            From scattered work to one deliberate operating system.
          </strong>
        </div>
        <div className={styles.fieldImage}>
          <img
            src="/projects/vault-zero-site.png"
            alt="Vault Zero project preview"
          />
        </div>
      </section>
    </article>
  )
}

function FlightDeck() {
  return (
    <article
      className={`${styles.preview} ${styles.flightDeck}`}
      aria-label="Flight deck portfolio direction"
    >
      <nav>
        <b>DREW / SYSTEMS</b>
        <span>Index 17</span>
        <span>Chicago / 41.88° N</span>
        <a href="mailto:drewsepeczi@gmail.com">
          Open a channel <ArrowUpRight />
        </a>
      </nav>
      <div className={styles.deckGrid}>
        <section className={styles.deckIntro}>
          <p>
            <i />
            Available for focused product engagements
          </p>
          <h2>
            I take ideas
            <br />
            through <mark>launch.</mark>
          </h2>
          <p className={styles.deckCopy}>
            Strategy, interface, AI systems, and the unglamorous infrastructure
            that lets a product keep working.
          </p>
          <a href="#systems">
            Inspect the systems <ArrowDownRight />
          </a>
        </section>
        <aside className={styles.deckStatus}>
          <p>Current status</p>
          <strong>
            Building
            <br />
            with intent
          </strong>
          <dl>
            <div>
              <dt>Products shipped</dt>
              <dd>30+</dd>
            </div>
            <div>
              <dt>AI systems</dt>
              <dd>10+</dd>
            </div>
          </dl>
        </aside>
      </div>
      <section id="systems" className={styles.deckProject}>
        <p>01 / VAULT ZERO</p>
        <div>
          <h3>Clear the signal.</h3>
          <p>One focused control room for private, high-leverage work.</p>
          <a href="#">
            View system <ArrowUpRight />
          </a>
        </div>
        <div className={styles.deckImage}>
          <img
            src="/projects/vault-zero-site.png"
            alt="Vault Zero project preview"
          />
        </div>
      </section>
    </article>
  )
}

function Workbench() {
  return (
    <article
      className={`${styles.preview} ${styles.workbench}`}
      aria-label="Workbench portfolio direction"
    >
      <nav>
        <b>
          Drew Sepeczi <span>✳</span>
        </b>
        <div>
          <a href="#work">Work</a>
          <a href="#">Notes</a>
          <a href="#">About</a>
        </div>
        <a href="mailto:drewsepeczi@gmail.com">
          Let&apos;s make something <ArrowUpRight />
        </a>
      </nav>
      <div className={styles.benchHero}>
        <div>
          <p>Product engineer · Chicago</p>
          <h2>
            Make the
            <br />
            useful thing.
          </h2>
          <p>
            I work with founders to shape, build, and ship products people come
            back to.
          </p>
          <a href="#work">
            See what&apos;s on the bench <ArrowDownRight />
          </a>
        </div>
        <div className={styles.benchStamp}>
          <span>AI</span>
          <span>⇢</span>
          <span>UX</span>
          <span>⇢</span>
          <span>LIVE</span>
        </div>
      </div>
      <section id="work" className={styles.benchWork}>
        <div>
          <p>Latest build</p>
          <h3>Vault Zero</h3>
          <p>Private work, made legible.</p>
          <a href="#">
            Open project <ArrowUpRight />
          </a>
        </div>
        <div className={styles.benchImage}>
          <img
            src="/projects/vault-zero-site.png"
            alt="Vault Zero project preview"
          />
        </div>
        <p className={styles.benchFoot}>
          <Check /> Strategy · Design · Build · Launch
        </p>
      </section>
    </article>
  )
}
