import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export interface PersonCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  name: string;
  role: React.ReactNode;
  /** Imported image module URL for the portrait. */
  avatarSrc?: string;
  /** Short editorial blurb. */
  bio?: React.ReactNode;
  tags?: string[];
  /** Compact row for lists, or a full card. */
  layout?: "card" | "row";
}

/** Faculty, mentor or point-of-contact card. */
export const PersonCard = React.forwardRef<HTMLDivElement, PersonCardProps>(
  ({ className, name, role, avatarSrc, bio, tags, layout = "card", ...props }, ref) => {
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");

    if (layout === "row") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-3 border-b border-border py-3", className)}
          {...props}
        >
          <Avatar className="size-9">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[14px] font-medium text-foreground">{name}</span>
            <span className="eyebrow truncate text-muted-foreground">{role}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "card-elevated flex h-full flex-col gap-4 rounded-[4px] border border-border bg-card p-6",
          className,
        )}
        {...props}
      >
        <Avatar className="size-14">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="font-display text-[17px] font-medium tracking-[-0.01em] text-foreground">
            {name}
          </p>
          <p className="eyebrow text-muted-foreground">{role}</p>
        </div>
        {bio ? <p className="text-[14px] leading-relaxed text-muted-foreground">{bio}</p> : null}
        {tags?.length ? (
          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);
PersonCard.displayName = "PersonCard";
