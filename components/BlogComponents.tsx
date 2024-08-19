import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  imageUrl: string;
  title: string;
  description: string;
  author: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ imageUrl, title, description, author }) => (
  <Card className="w-full max-w-sm">
    <CardHeader className="p-0">
      <Image src={imageUrl} alt={title} width={384} height={200} className="object-cover w-full h-48" />
    </CardHeader>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </CardContent>
    <CardFooter className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={`/authors/${author}.jpg`} alt={author} />
          <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{author}</span>
      </div>
      <Button variant="ghost" size="sm">阅读更多</Button>
    </CardFooter>
  </Card>
);

export const FeaturedBlogCard: React.FC<BlogCardProps> = ({ imageUrl, title, description, author }) => (
  <Card className="w-full max-w-4xl">
    <div className="flex flex-col md:flex-row">
      <Image src={imageUrl} alt={title} width={600} height={400} className="object-cover w-full md:w-1/2 h-64 md:h-auto" />
      <div className="flex flex-col justify-between p-6 md:w-1/2">
        <CardHeader>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </CardHeader>
        <CardFooter className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`/authors/${author}.jpg`} alt={author} />
              <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{author}</span>
          </div>
          <Button>阅读全文</Button>
        </CardFooter>
      </div>
    </div>
  </Card>
);

interface InterestTagProps {
  label: string;
}

export const InterestTag: React.FC<InterestTagProps> = ({ label }) => (
  <Badge variant="secondary" className="mr-2 mb-2">{label}</Badge>
);

interface SaveButtonProps {
  label: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ label }) => (
  <Button className="mt-4">{label}</Button>
);

