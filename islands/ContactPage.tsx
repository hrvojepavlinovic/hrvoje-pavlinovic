import { useEffect } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";
import SocialIcon from "../components/SocialIcon.tsx";

interface ContactLink {
  name: string;
  url: string;
  iconType: "github" | "linkedin" | "email" | "x";
  description: string;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/hrvojepavlinovic",
    iconType: "github",
    description: "Check out my open source projects and contributions"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/hpavlino",
    iconType: "linkedin",
    description: "Connect with me professionally"
  },
  {
    name: "Email",
    url: "mailto:hrvoje@pavlinovic.com",
    iconType: "email",
    description: "Send me an email at hrvoje@pavlinovic.com"
  },
  {
    name: "X",
    url: "https://x.com/0xhp10",
    iconType: "x",
    description: "Follow me for tech insights and updates"
  }
];

export default function ContactPage() {
  useEffect(() => {
    trackEvent({
      type: "pageview",
      page: "contact"
    });
  }, []);

  return (
    <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32 pb-24">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Contact</h1>
        
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-12">
          I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology and development. Feel free to reach out through any of these channels:
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          {CONTACT_LINKS.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent({
                  type: "click",
                  clickType: "link",
                  target: link.name.toLowerCase()
                });
              }}
              class="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50"
            >
              <div class="flex items-center mb-4">
                <div class="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <SocialIcon type={link.iconType} />
                </div>
                <h2 class="ml-3 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white">
                  {link.name}
                </h2>
              </div>
              <p class="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 