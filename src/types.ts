export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  isQna?: boolean; // AEO formatted Question & Answer
  quickAnswer?: string; // Direct concise answer for search snippet / AEO
  content: string[]; // Rich paragraphs
  pullQuote?: string;
  highlightBox?: {
    title: string;
    text: string;
  };
}

export interface Article {
  slug: string;
  title: string;
  deck: string;
  category: string;
  primaryKeyword: string;
  relatedKeywords: [string, string];
  seoTitle: string;
  metaDescription: string;
  heroImage: string;
  imageAlt: string;
  author: {
    name: string;
    handle: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  wordCount: number;
  featured?: boolean;
  trendingRank?: number;
  sections: ArticleSection[];
  conclusion: {
    heading: string;
    content: string[];
  };
  keyTakeaways: string[];
  relatedSlugs: string[];
}

export interface UserComment {
  id: string;
  authorName: string;
  authorHandle: string;
  timestamp: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}
