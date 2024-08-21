import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { supabase } from '@/lib/supabase';

// 这个函数用于获取所有的 slugs，用于静态生成
export async function generateStaticParams() {
  const { data: markdownFiles } = await supabase
    .from('markdown_files')
    .select('slug');

  return markdownFiles?.map(({ slug }) => ({
    slug,
  })) || [];
}

// 这个函数从数据库获取文章内容
async function getArticleContent(slug: string) {
  const { data, error } = await supabase
    .from('markdown_files')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;

  return {
    title: data.title,
    content: data.content,
    author: data.author || 'Anonymous', // 假设你的表中有 author 字段，如果没有则使用 'Anonymous'
    publishDate: new Date(data.created_at).toISOString().split('T')[0], // 格式化日期
    imageUrl: data.cover_image_url || '/images/default-cover.jpg' // 使用封面图片 URL，如果没有则使用默认图片
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleContent(params.slug);

  return (
    <div className="article-page max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            width={800} 
            height={400} 
            className="w-full h-64 object-cover mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage src={`/authors/${article.author}.jpg`} alt={article.author} />
              <AvatarFallback>{article.author[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-gray-500">{article.publishDate}</p>
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
    </div>
  );
}