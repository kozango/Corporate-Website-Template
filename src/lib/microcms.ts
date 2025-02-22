import { createClient } from 'microcms-js-sdk';

if (!import.meta.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!import.meta.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category: {
    id: string;
    name: string;
  };
  publishedAt: string;
  revisedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getBlogs(queries?: {
  offset?: number;
  limit?: number;
  filters?: string;
}) {
  return await client.get<BlogResponse>({
    endpoint: 'blogs',
    queries: {
      offset: queries?.offset || 0,
      limit: queries?.limit || 10,
      filters: queries?.filters,
    },
  });
}

export async function getBlogDetail(contentId: string) {
  return await client.get<Blog>({
    endpoint: 'blogs',
    contentId,
  });
}

export async function getCategories() {
  return await client.get({
    endpoint: 'categories',
  });
}
