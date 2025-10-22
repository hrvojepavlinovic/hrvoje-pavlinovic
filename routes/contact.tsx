import { Head } from "$fresh/runtime.ts";
import ContactPage from "../islands/ContactPage.tsx";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Hrvoje Pavlinovic</title>
        <meta
          name="description"
          content="Get in touch with Hrvoje Pavlinovic for collaboration, opportunities, or just to say hello. Blockchain development, consulting, or technical leadership inquiries welcome."
        />
        <meta
          name="keywords"
          content="Contact Hrvoje Pavlinovic, Hire Blockchain Developer, Blockchain Consultant, Technical Leadership"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/contact" />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://hrvoje.pavlinovic.com/contact"
        />
        <meta property="og:title" content="Contact | Hrvoje Pavlinovic" />
        <meta
          property="og:description"
          content="Get in touch with Hrvoje Pavlinovic for collaboration, opportunities, or just to say hello. Blockchain development, consulting, or technical leadership inquiries welcome."
        />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/pfp.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="Contact | Hrvoje Pavlinovic" />
        <meta
          name="twitter:description"
          content="Get in touch with Hrvoje Pavlinovic for collaboration, opportunities, or just to say hello. Blockchain development, consulting, or technical leadership inquiries welcome."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/pfp.png"
        />
      </Head>

      <ContactPage />
    </>
  );
}
