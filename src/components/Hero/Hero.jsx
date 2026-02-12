import React, { useEffect, useMemo, useState } from "react";
import { siteConfig } from "../../data/siteConfig.js";
import "./Hero.css";

export default function Hero() {
  const slides = useMemo(() => siteConfig.hero.slides, []);
  const intervalMs = siteConfig.hero.slideIntervalMs;

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  return (
    <section className="section">
      <div className="container hero">
        <div className="hero__left card">
          <div className="hero__leftInner">
            <h1 className="h1">{siteConfig.motto}</h1>
            <p className="p">{siteConfig.description}</p>

            <div className="hero__ctaRow">
              <a className="hero__cta" href="/contact">Start a collaboration</a>
              <a className="hero__cta ghost" href="/about">Learn more</a>
            </div>

            <div className="hero__mini">
              <div className="hero__chip">Industry ↔ University</div>
              <div className="hero__chip">Proposals & Grants</div>
              <div className="hero__chip">Global Partnerships</div>
            </div>
          </div>
        </div>

        <div className="hero__right card">
          <div className="hero__slider" aria-label="Image slider">
            {slides.map((src, i) => (
              <div
                key={src + i}
                className={`hero__slide ${i === idx ? "active" : ""}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
            <div className="hero__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero__dot ${i === idx ? "active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
