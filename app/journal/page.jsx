import { getJournalPosts } from "@/lib/manifests";

import { JournalPageClient } from "./journal-page-client";

export const metadata = {
  title: "Journal",
};

export default function JournalPage() {
  const posts = getJournalPosts();

  return <JournalPageClient posts={posts} />;
}
