import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import { siteConfig } from "../../data/siteConfig.js";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const items = useMemo(() => siteConfig.nav.items, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="cx-nav">
      <div className="container cx-nav__inner">
        <Link className="cx-brand" to="/">
          <Logo size={40} />
          <div className="cx-brand__text">
            <div className="cx-brand__name">{siteConfig.brand}</div>
            <div className="cx-brand__sub">Strategic collaboration</div>
          </div>
        </Link>

        <div className="cx-nav__right" ref={menuRef}>
          <button className="cx-dd-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {siteConfig.nav.dropdownLabel}
            <span className={`cx-dd-caret ${open ? "open" : ""}`} />
          </button>

          {open && (
            <div className="cx-dd">
              {items.map((it) => (
                <NavLink
                  key={it.path}
                  to={it.path}
                  className={({ isActive }) => `cx-dd__item ${isActive ? "active" : ""}`}
                >
                  {it.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
