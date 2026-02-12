import React, { useMemo } from "react";
import { siteConfig } from "../../data/siteConfig.js";
import "./PartnerMarquee.css";

export default function PartnerMarquee() {
  const items = useMemo(() => siteConfig.partners, []);
  // duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="partnerBar">
      <div className="container partnerBar__inner">
        <div className="partnerBar__label">Partners</div>
        <div className="partnerBar__marquee" aria-label="Partner list marquee">
          <div className="partnerBar__track">
            {loop.map((p, i) => (
              <div className="partnerBar__pill" key={`${p}-${i}`}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
