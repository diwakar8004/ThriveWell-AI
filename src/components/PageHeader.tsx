import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 sm:mb-10">
      <div className="space-y-2 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-gray-500 leading-relaxed">{description}</p> : null}
      </div>
      {children ? <div className="shrink-0 w-full md:w-auto flex flex-wrap gap-2 justify-start md:justify-end">{children}</div> : null}
    </header>
  );
}
