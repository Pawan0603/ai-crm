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
import axios from "axios";

type SentimentType = "positive" | "neutral" | "negative";

interface FormData {
  hcpName: string;
  interactionType: string;
  date: string;
  time: string;
  attendees: string;
  topics: string;
  outcomes: string;
  followUps: string;
  sentiment: SentimentType;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    hcpName: "",
    interactionType: "Meeting",
    date: "19-04-2025",
    time: "19:36",
    attendees: "",
    topics: "",
    outcomes: "",
    followUps: "",
    sentiment: "neutral",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setSentiment = (value: SentimentType) => {
    setFormData((prev) => ({ ...prev, sentiment: value }));
  };

  const handleSubmit = () => {
    console.log("FORM DATA:", formData);
  };

  const handleAI = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/interaction/agent",
        { message }
      );

      const result = res.data.data;

      console.log("AI RESULT:", result.data);

      // tool se jo data aaya
      if (result.data) {
        setFormData((prev) => ({
          ...prev,
          ...result.data
        }));
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="mb-4 text-2xl font-semibold text-foreground">
          Log HCP Interaction
        </h1>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">

          {/* LEFT */}
          <section className="rounded-md border border-panel-interaction-border bg-card">
            <header className="rounded-t-md border-b border-panel-interaction-border bg-panel-interaction px-4 py-2.5">
              <h2 className="text-sm font-semibold text-foreground">
                Interaction Details
              </h2>
            </header>

            <div className="space-y-4 p-4">

              {/* HCP + TYPE */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="HCP Name">
                  <input
                    name="hcpName"
                    value={formData.hcpName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search or select HCP..."
                    className="h-9 w-full rounded border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </Field>

                <Field label="Interaction Type">
                  <div className="relative">
                    <select
                      name="interactionType"
                      value={formData.interactionType}
                      onChange={handleChange}
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

              {/* DATE + TIME */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date">
                  <div className="relative">
                    <input
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      type="text"
                      className="h-9 w-full rounded border border-input bg-card px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <CalendarIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>

                <Field label="Time">
                  <div className="relative">
                    <input
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      type="text"
                      className="h-9 w-full rounded border border-input bg-card px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <Clock className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>
              </div>

              {/* ATTENDEES */}
              <Field label="Attendees">
                <input
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter names or search..."
                  className="h-9 w-full rounded border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </Field>

              {/* TOPICS */}
              <Field label="Topics Discussed">
                <div className="relative">
                  <textarea
                    name="topics"
                    value={formData.topics}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter key discussion points..."
                    className="w-full resize-y rounded border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <Mic className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-muted-foreground" />
                </div>
              </Field>

              {/* BUTTON */}
              <button className="inline-flex items-center gap-2 rounded border border-input bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Summarize from Voice Note (Requires Consent)
              </button>

              {/* SUBCARDS */}
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

              {/* SENTIMENT */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  Observed/Inferred HCP Sentiment
                </h3>
                <div className="flex items-center gap-6">
                  <SentimentRadio label="Positive" value="positive" selected={formData.sentiment} onChange={setSentiment} icon={<Smile className="h-4 w-4 text-sentiment-positive" />} />
                  <SentimentRadio label="Neutral" value="neutral" selected={formData.sentiment} onChange={setSentiment} icon={<Meh className="h-4 w-4 text-sentiment-neutral" />} />
                  <SentimentRadio label="Negative" value="negative" selected={formData.sentiment} onChange={setSentiment} icon={<Frown className="h-4 w-4 text-sentiment-negative" />} />
                </div>
              </div>

              {/* OUTCOMES */}
              <Field label="Outcomes">
                <textarea name="outcomes" value={formData.outcomes} onChange={handleChange} rows={3} className="w-full resize-y rounded border border-input bg-card px-3 py-2 text-sm text-foreground" />
              </Field>

              {/* FOLLOWUPS */}
              <Field label="Follow-up Actions">
                <textarea name="followUps" value={formData.followUps} onChange={handleChange} rows={3} className="w-full resize-y rounded border border-input bg-card px-3 py-2 text-sm text-foreground" />
              </Field>

              {/* SUGGESTIONS */}
              <div className="space-y-1 pt-1 text-xs">
                <p className="text-muted-foreground">AI Suggested Follow-ups:</p>
                <ul className="space-y-1">
                  <SuggestedItem text="Schedule follow-up meeting in 2 weeks" />
                  <SuggestedItem text="Send OncoBoost Phase III PDF" />
                  <SuggestedItem text="Add Dr. Sharma to advisory board invite list" />
                </ul>
              </div>

              <button onClick={handleSubmit} className="rounded bg-primary px-4 py-2 text-white">
                Submit
              </button>

            </div>
          </section>

          {/* RIGHT AI PANEL FULL */}
          <aside className="flex h-fit flex-col rounded-md border border-panel-ai-border bg-panel-ai">

            <header className="border-b border-panel-ai-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Bot className="h-3 w-3 text-accent-foreground" />
                </div>
                <h2 className="text-sm font-semibold text-foreground">AI Assistant</h2>
              </div>
              <p className="ml-7 text-xs text-muted-foreground">
                Log interaction via chat
              </p>
            </header>

            <div className="flex-1 space-y-3 p-3" style={{ minHeight: 520 }}>
              <div className="max-w-[90%] rounded-md border border-panel-ai-border/60 bg-ai-bubble px-3 py-2 text-xs text-foreground">
                Log interaction details here...
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-panel-ai-border bg-card/50 p-2">
              <input
                name="aiInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="h-8 flex-1 rounded border border-input bg-card px-2 text-xs text-foreground"
              />
              <button
                onClick={handleAI}
                className="inline-flex h-8 items-center gap-1 rounded bg-primary px-3 text-xs text-white"
              >
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

/* SAME COMPONENTS (UNCHANGED) */
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="block text-xs font-medium text-foreground">{label}</label>
    {children}
  </div>
);

const SubCard = ({ title, empty, action }: any) => (
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

const SentimentRadio = ({ label, value, selected, onChange, icon }: any) => {
  const checked = selected === value;
  return (
    <label className="flex cursor-pointer items-center gap-1.5 text-sm text-foreground">
      <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${checked ? "border-accent" : "border-muted-foreground/40"}`}>
        {checked && <span className="h-2 w-2 rounded-full bg-accent" />}
      </span>
      <input type="radio" className="sr-only" checked={checked} onChange={() => onChange(value)} />
      {icon}
      <span>{label}</span>
    </label>
  );
};

const SuggestedItem = ({ text }: any) => (
  <li className="flex items-center gap-1 text-link">
    <Plus className="h-3 w-3" />
    <a href="#" className="hover:underline">{text}</a>
  </li>
);

export default Index;