interface ComingSoonProps {
  pageName: string;
}

export default function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    <div class="min-h-screen flex items-center justify-center">
      <h1 class="dark:text-white/60 text-black/60 text-2xl tracking-wide">
        {pageName} page coming soon
      </h1>
    </div>
  );
} 