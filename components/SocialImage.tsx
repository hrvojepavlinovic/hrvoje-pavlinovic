export const socialImageUrl = (page: string) =>
  `https://hrvoje.pavlinovic.com/social/${page}-20261016.png`;

export default function SocialImage(
  { src, alt, standard = true }: {
    src: string;
    alt: string;
    standard?: boolean;
  },
) {
  return (
    <>
      <meta property="og:image" content={src} />
      <meta property="og:image:alt" content={alt} />
      {standard && (
        <>
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta name="twitter:image" content={src} />
      <meta name="twitter:image:alt" content={alt} />
    </>
  );
}
