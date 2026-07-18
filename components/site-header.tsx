"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Mail, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

import { SiteLogo } from "@/components/site-logo"

const links = [
  { href: "/#products", label: "Work" },
  { href: "/#about", label: "Approach" },
  { href: "/#writing", label: "Writing" },
] as const

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { resolvedTheme, setTheme } = useTheme()

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

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="atelier-nav">
      <div className="atelier-nav__pill">
        <SiteLogo
          className="atelier-nav__brand"
          markClassName="size-7"
          label="Drew"
        />

        <nav className="atelier-nav__links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/gallery">Gallery</Link>
        </nav>

        <button
          type="button"
          className="atelier-nav__theme"
          aria-label="Toggle color theme"
          title="Toggle theme (D)"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Moon className="dark:hidden" aria-hidden="true" />
          <Sun className="hidden dark:block" aria-hidden="true" />
        </button>

        <a href="mailto:drewsepeczi@gmail.com" className="atelier-nav__cta">
          <Mail aria-hidden="true" />
          Let’s talk
        </a>

        <button
          type="button"
          className="atelier-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="atelier-mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="atelier-mobile-navigation"
        className="atelier-mobile-nav"
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
        <div className="atelier-mobile-nav__panel">
          <div className="atelier-mobile-nav__topline">
            <span>Drew Sepeczi</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <Link
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link href="/gallery" onClick={closeMenu}>
              <span>Gallery</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
          <a
            href="mailto:drewsepeczi@gmail.com"
            className="atelier-mobile-nav__cta"
            onClick={closeMenu}
          >
            <Mail aria-hidden="true" />
            Email Drew
          </a>
        </div>
      </dialog>
    </header>
  )
}
