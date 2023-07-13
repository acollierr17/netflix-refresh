import { Badge } from "@/components/ui/badge";

type BaseBadgeProps = React.PropsWithChildren;

function BaseTitleTypeBadge({ children, ...props }: BaseBadgeProps) {
  return (
    <Badge variant="outline" {...props}>
      {children}
    </Badge>
  );
}

export function MovieBadge() {
  return <BaseTitleTypeBadge>Movie</BaseTitleTypeBadge>;
}

export function SeriesBadge() {
  return <BaseTitleTypeBadge>Series</BaseTitleTypeBadge>;
}
