import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// 这个函数应该从你的数据源获取文章内容
async function getArticleContent(slug: string) {
  // 这里应该是实际的数据获取逻辑
  return {
    title: "The History of New York Garbage Mafia",
    content: `
# The History of New York Garbage Mafia

The New York garbage mafia cartel, a criminal enterprise controlled by Italian-American crime families, dominated the city's private waste collection industry for decades.

## Origins

The involvement of organized crime in New York's waste management industry dates back to the 1950s. Mob-controlled companies used various tactics to maintain their grip on the market:

- Violence and intimidation
- Price fixing
- Bribery of officials

## Key Players

Some of the major crime families involved included:

- Gambino family
- Genovese family
- Lucchese family

## Government Response

In the 1990s, the government began a crackdown on the garbage mafia:

1. RICO Act prosecutions
2. Industry reforms
3. Increased regulation

## Legacy

While the influence of organized crime has diminished, the history of the New York garbage mafia continues to fascinate and serve as a reminder of the city's complex past.
    `,
    author: "twombly",
    publishDate: "2023-05-15",
    imageUrl: "/images/new-york-mafia.jpg"
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