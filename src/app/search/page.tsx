import { SearchPageClient } from "./SearchPageClient";

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : null;

  return <SearchPageClient initialQuery={q} initialCategory={category} />;
}
