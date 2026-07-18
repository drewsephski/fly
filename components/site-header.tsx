"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Mail, Menu, X } from "lucide-react"

import { SiteLogo } from "@/components/site-logo"

const primaryLinks = [
  { href: "#products", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
] as const

const secondaryLinks = [
  { href: "#about", label: "About" },
  { href: "/gallery", label: "Gallery" },
] as const

export function SiteHeader() {
  const [isFloating, setIsFloating] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let frame = 0
    let floating = false

    const update = () => {
      const next = window.scrollY > 80
      if (next !== floating) {
        floating = next
        setIsFloating(next)
      }
      frame = 0
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (menuOpen && !dialog.open) {
      dialog.showModal()
      window.requestAnimationFrame(() => firstLinkRef.current?.focus())
    } else if (!menuOpen && dialog.open) {
      dialog.close()
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.preventDefault()
      setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown, true)
    return () => document.removeEventListener("keydown", onKeyDown, true)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={isFloating ? "site-nav is-floating" : "site-nav"}>
      <div className="site-nav__inner">
        <SiteLogo
          className="site-nav__brand min-h-11"
          markClassName="size-8"
          label="Drew Sepeczi"
        />

        <nav className="site-nav__desktop" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <a key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </a>
          ))}
          <Link href="/gallery" className="site-nav__link">
            Gallery
          </Link>
        </nav>

        <div className="site-nav__actions">
          <a
            href="https://squidagent.app"
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav__product"
          >
            Squid Agent
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="mailto:drewsepeczi@gmail.com" className="site-nav__email">
            <Mail aria-hidden="true" />
            Email Drew
          </a>
        </div>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        onCancel={(event) => {
          event.preventDefault()
          closeMenu()
        }}
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}
      >
        <div className="mobile-nav__panel">
          <div className="mobile-nav__topline">
            <span>Navigate</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <nav className="mobile-nav__links" aria-label="Mobile navigation">
            {[...primaryLinks, ...secondaryLinks].map((link, index) => {
              const content = (
                <>
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                </>
              )

              if (link.href.startsWith("/")) {
                return (
                  <Link key={link.href} href={link.href} onClick={closeMenu}>
                    {content}
                  </Link>
                )
              }

              return (
                <a
                  key={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                >
                  {content}
                </a>
              )
            })}
          </nav>

          <div className="mobile-nav__actions">
            <a
              href="mailto:drewsepeczi@gmail.com"
              onClick={closeMenu}
              className="mobile-nav__primary"
            >
              <Mail aria-hidden="true" />
              Email Drew
            </a>
            <a
              href="https://squidagent.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mobile-nav__secondary"
            >
              Open Squid Agent
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </dialog>
    </header>
  )
}
