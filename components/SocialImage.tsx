export const socialImageUrl = (page: string) =>
  `https://hrvoje.pavlinovic.com/social/${page}-20261016.png`;

export default function SocialImage(
  {
    src,
    alt,
    standard = true,
    width = standard ? 1200 : undefined,
    height = standard ? 630 : undefined,
    mimeType = standard ? "image/png" : undefined,
  }: {
    src: string;
    alt: string;
    standard?: boolean;
    width?: number;
    height?: number;
    mimeType?: string;
  },
) {
  return (
    <>
      <meta property="og:image" content={src} />
      <meta property="og:image:alt" content={alt} />
      {mimeType && <meta property="og:image:type" content={mimeType} />}
      {width && height && (
        <>
          <meta property="og:image:width" content={String(width)} />
          <meta property="og:image:height" content={String(height)} />
        </>
      )}
      <meta name="twitter:image" content={src} />
      <meta name="twitter:image:alt" content={alt} />
    </>
  );
}
