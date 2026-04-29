import { siteContent } from "@/content/site";

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
            Start a conversation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
            Use this page as the first enquiry route for commissions,
            collaborations, product questions, or wholesale conversations.
          </p>
          <div className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
              Email
            </p>
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="mt-3 block text-2xl font-semibold text-stone-950"
            >
              {siteContent.contact.email}
            </a>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              Replace this with your preferred public email, contact form, or
              booking link when you are ready.
            </p>
          </div>
        </div>

        <form className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Name</span>
              <input
                className="mt-2 w-full rounded-full border border-stone-200 px-4 py-3 outline-none transition focus:border-stone-950"
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Email</span>
              <input
                className="mt-2 w-full rounded-full border border-stone-200 px-4 py-3 outline-none transition focus:border-stone-950"
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-700">
                Message
              </span>
              <textarea
                className="mt-2 min-h-40 w-full rounded-3xl border border-stone-200 px-4 py-3 outline-none transition focus:border-stone-950"
                placeholder="Tell me what you are interested in..."
              />
            </label>
            <button
              className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              type="button"
            >
              Placeholder form
            </button>
            <p className="text-xs leading-5 text-stone-500">
              This form is visual only for the first scaffold. It can later be
              connected to email, a CRM, or a form service.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
