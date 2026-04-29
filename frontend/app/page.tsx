'use client';
import { useState } from "react";
import {
  Search,
  Mic,
  Sparkles,
  Plus,
  FlaskConical,
  Smile,
  Meh,
  Frown,
  Bot,
  AlertTriangle,
  Calendar as CalendarIcon,
  Clock,
  ChevronDown,
} from "lucide-react";

const Index = () => {
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative">("neutral");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="mb-4 text-2xl font-semibold text-foreground">Log HCP Interaction</h1>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          {/* LEFT: Interaction Details */}
          <section className="rounded-md border border-panel-interaction-border bg-card">
            <header className="rounded-t-md border-b border-panel-interaction-border bg-panel-interaction px-4 py-2.5">
              <h2 className="text-sm font-semibold text-foreground">Interaction Details</h2>
            </header>

            <div className="space-y-4 p-4">
              {/* HCP Name + Interaction Type */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="HCP Name">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search or select HCP..."
                      className="h-9 w-full rounded border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                </Field>
                <Field label="Interaction Type">
                  <div className="relative">
                    <select
                      defaultValue="Meeting"
                      className="h-9 w-full appearance-none rounded border border-input bg-card px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      <option>Meeting</option>
                      <option>Call</option>
                      <option>Email</option>
                      <option>Event</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date">
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="19-04-2025"
                      className="h-9 w-full rounded border border-input bg-card px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <CalendarIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>
                <Field label="Time">
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="19:36"
                      className="h-9 w-full rounded border border-input bg-card px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <Clock className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>
              </div>

              {/* Attendees */}
              <Field label="Attendees">
                <input
                  type="text"
                  placeholder="Enter names or search..."
                  className="h-9 w-full rounded border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </Field>

              {/* Topics Discussed */}
              <Field label="Topics Discussed">
                <div className="relative">
                  <textarea
                    placeholder="Enter key discussion points..."
                    rows={4}
                    className="w-full resize-y rounded border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <Mic className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-muted-foreground" />
                </div>
              </Field>

              <button className="inline-flex items-center gap-2 rounded border border-input bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Summarize from Voice Note (Requires Consent)
              </button>

              {/* Materials Shared / Samples Distributed */}
              <div className="space-y-2 pt-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Materials Shared / Samples Distributed
                </h3>

                <SubCard
                  title="Materials Shared"
                  empty="No materials added."
                  action={
                    <button className="inline-flex items-center gap-1.5 rounded border border-input bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                      <Search className="h-3.5 w-3.5" />
                      Search/Add
                    </button>
                  }
                />

                <SubCard
                  title="Samples Distributed"
                  empty="No samples added."
                  action={
                    <button className="inline-flex items-center gap-1.5 rounded border border-input bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                      <FlaskConical className="h-3.5 w-3.5" />
                      Add Sample
                    </button>
                  }
                />
              </div>

              {/* Sentiment */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  Observed/Inferred HCP Sentiment
                </h3>
                <div className="flex items-center gap-6">
                  <SentimentRadio
                    label="Positive"
                    value="positive"
                    selected={sentiment}
                    onChange={setSentiment}
                    icon={<Smile className="h-4 w-4 text-sentiment-positive" />}
                  />
                  <SentimentRadio
                    label="Neutral"
                    value="neutral"
                    selected={sentiment}
                    onChange={setSentiment}
                    icon={<Meh className="h-4 w-4 text-sentiment-neutral" />}
                  />
                  <SentimentRadio
                    label="Negative"
                    value="negative"
                    selected={sentiment}
                    onChange={setSentiment}
                    icon={<Frown className="h-4 w-4 text-sentiment-negative" />}
                  />
                </div>
              </div>

              {/* Outcomes */}
              <Field label="Outcomes">
                <textarea
                  placeholder="Key outcomes or agreements..."
                  rows={3}
                  className="w-full resize-y rounded border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </Field>

              {/* Follow-up Actions */}
              <Field label="Follow-up Actions">
                <textarea
                  placeholder="Enter next steps or tasks..."
                  rows={3}
                  className="w-full resize-y rounded border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </Field>

              <div className="space-y-1 pt-1 text-xs">
                <p className="text-muted-foreground">AI Suggested Follow-ups:</p>
                <ul className="space-y-1">
                  <SuggestedItem text="Schedule follow-up meeting in 2 weeks" />
                  <SuggestedItem text="Send OncoBoost Phase III PDF" />
                  <SuggestedItem text="Add Dr. Sharma to advisory board invite list" />
                </ul>
              </div>
            </div>
          </section>

          {/* RIGHT: AI Assistant */}
          <aside className="flex h-fit flex-col rounded-md border border-panel-ai-border bg-panel-ai">
            <header className="border-b border-panel-ai-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Bot className="h-3 w-3 text-accent-foreground" />
                </div>
                <h2 className="text-sm font-semibold text-foreground">AI Assistant</h2>
              </div>
              <p className="ml-7 text-xs text-muted-foreground">Log interaction via chat</p>
            </header>

            <div className="flex-1 space-y-3 p-3" style={{ minHeight: 520 }}>
              <div className="max-w-[90%] rounded-md border border-panel-ai-border/60 bg-ai-bubble px-3 py-2 text-xs leading-relaxed text-foreground">
                Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy,
                positive sentiment, shared brochure") or ask for help.
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-panel-ai-border bg-card/50 p-2">
              <input
                type="text"
                placeholder="Describe interaction..."
                className="h-8 flex-1 rounded border border-input bg-card px-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
              <button className="inline-flex h-8 items-center gap-1 rounded bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                <AlertTriangle className="h-3.5 w-3.5" />
                Log
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="block text-xs font-medium text-foreground">{label}</label>
    {children}
  </div>
);

const SubCard = ({
  title,
  empty,
  action,
}: {
  title: string;
  empty: string;
  action: React.ReactNode;
}) => (
  <div className="rounded border border-border bg-card p-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs italic text-muted-foreground">{empty}</p>
      </div>
      {action}
    </div>
  </div>
);

const SentimentRadio = ({
  label,
  value,
  selected,
  onChange,
  icon,
}: {
  label: string;
  value: "positive" | "neutral" | "negative";
  selected: string;
  onChange: (v: "positive" | "neutral" | "negative") => void;
  icon: React.ReactNode;
}) => {
  const checked = selected === value;
  return (
    <label className="flex cursor-pointer items-center gap-1.5 text-sm text-foreground">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          checked ? "border-accent" : "border-muted-foreground/40"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-accent" />}
      </span>
      <input
        type="radio"
        className="sr-only"
        checked={checked}
        onChange={() => onChange(value)}
      />
      {icon}
      <span>{label}</span>
    </label>
  );
};

const SuggestedItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-1 text-link">
    <Plus className="h-3 w-3" />
    <a href="#" className="hover:underline">
      {text}
    </a>
  </li>
);

export default Index;
