import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border-default py-8">
      <Container className="flex flex-col items-center gap-2 text-center text-small text-text-tertiary sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} Servora. All rights reserved.</p>
        <p>Find the right service, right when you need it.</p>
      </Container>
    </footer>
  );
}
