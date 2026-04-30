import { cn } from "@/lib/cn";

export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-eyebrow", className)}>
      {"— "}
      {children}
    </span>
  );
}
