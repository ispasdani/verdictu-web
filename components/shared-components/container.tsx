import { cn } from "@/lib/utils";

export const Container = <T extends React.ElementType = "div">({
  children,
  className,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  as?: T;
}) => {
  const Component = as || "div";
  return (
    <Component className={cn("mx-auto max-w-[140rem]", className)}>
      {children}
    </Component>
  );
};
