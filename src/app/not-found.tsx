import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-(--radius-lg) bg-primary-soft text-primary">
        <Compass size={22} aria-hidden />
      </div>
      <h1 className="text-h2 font-display text-text-primary">Page not found</h1>
      <p className="max-w-sm text-body text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button href={ROUTES.home} variant="primary">
        Back to home
      </Button>
    </Container>
  );
}
