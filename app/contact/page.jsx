import Image from "next/image";

import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/page-section";
import { SiteLink } from "@/components/site-link";
import { pageHero, siteConfig } from "@/app/site";

export const metadata = {
  title: "Contact",
};

const hero = pageHero.contact;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        images={hero.image}
        actions={[
          {
            label: "Send email",
            href: `mailto:${siteConfig.email}`,
            variant: "primary",
          },
          { label: "Browse the work", href: "/work", variant: "ghost" },
        ]}
      />

      <PageSection eyebrow="Contact" title="Get in touch">
        <div className="grid-2">
          <div className="card">
            <div
              className="figure__media"
              style={{
                position: "relative",
                aspectRatio: "4/3",
                marginBottom: "1.5rem",
              }}
            >
              <Image
                src="/assets/contact/_MG_4187.jpg"
                alt="Contact photograph"
                fill
                sizes="(min-width: 700px) 40vw, 100vw"
              />
            </div>
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="card-link__title"
              style={{ display: "block", marginTop: "0.75rem" }}
            >
              {siteConfig.email}
            </a>
            <p className="card-link__summary" style={{ marginTop: "1rem" }}>
              <SiteLink
                href="https://twitter.com/xanderhizome"
                variant="inline"
                context="content"
              >
                @xanderhizome on Twitter
              </SiteLink>
            </p>
          </div>

          <form className="card">
            <div className="form">
              <label className="field">
                <span className="field__label">Name</span>
                <input
                  className="field__input"
                  type="text"
                  placeholder="Your name"
                />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input
                  className="field__input"
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className="field">
                <span className="field__label">Message</span>
                <textarea
                  className="field__textarea"
                  placeholder="Tell me what you are interested in..."
                />
              </label>
              <button className="btn" type="button">
                Placeholder form
              </button>
              <p className="card-link__summary" style={{ fontSize: "0.75rem" }}>
                This form is visual only for now. It can later be connected to
                email, a CRM, or a form service.
              </p>
            </div>
          </form>
        </div>
      </PageSection>
    </>
  );
}
