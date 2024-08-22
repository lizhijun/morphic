import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

// 强制动态渲染
export const dynamic = 'force-dynamic';

// 这个函数从数据库获取文章内容
async function getArticleContent(slug: string) {
  try {
    const { data, error } = await supabase
      .from('markdown_files')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }

    return {
      title: data.title,
      content: data.content,
      author: data.author || 'Anonymous',
      publishDate: new Date(data.created_at).toISOString().split('T')[0],
      imageUrl: data.cover_image_url || '/images/default-cover.jpg'
    };
  } catch (error) {
    console.error('Error in getArticleContent:', error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleContent(params.slug);
  if (!article) return { title: '文章不存在' };

  return {
    title: article.title,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author],
      images: [article.imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.content.substring(0, 160),
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleContent(params.slug);

  if (!article) {
    return <div className="text-center p-6">文章不存在或加载失败</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.imageUrl,
    datePublished: article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: '解惑AI', // Replace with your actual site name
      logo: {
        '@type': 'ImageObject',
        url: 'https://jiehuoai.com/logo.png', // Replace with your actual logo URL
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="article-page max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              width={800} 
              height={400} 
              className="w-full h-64 object-cover mb-6"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar>
                <AvatarImage src={`/authors/${article.author}.jpg`} alt={article.author} />
                <AvatarFallback>{article.author[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author}</p>
                <time dateTime={article.publishDate} className="text-sm text-gray-500">{article.publishDate}</time>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              className="prose max-w-none text-gray-900"
            >
              {article.content}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </article>
    </>
  );
}