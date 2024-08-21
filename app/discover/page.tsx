import React from 'react';
import { BlogCard, FeaturedBlogCard, InterestTag, SaveButton } from '@/components/BlogComponents';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';


async function getMarkdownFiles() {
  const { data, error } = await supabase
    .from('markdown_files')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw error;
  return data;
}

const DiscoverPage = async () => {
  const markdownFiles = await getMarkdownFiles();

  return (
    <div className="discover-page p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">发现</h1>
      
      <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {markdownFiles.map((file) => (
          <Link href={`/page/${file.slug}`} key={file.id} passHref>
            <BlogCard
              imageUrl={file.cover_image_url || '/images/default-cover.jpg'}
              title={file.title}
              description={file.content.substring(0, 100) + '...'}
              author="User"
            />
          </Link>
        ))}
      </div>

      <Link href="/save-markdown">
        + 发布
      </Link>
      
      {/*
      <div className="interest-section bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">定制你的</h2>
        
        <p className="mb-4">选择主题和兴趣，定制你的发现体验</p>
        <div className="interest-tags flex flex-wrap">
          <InterestTag label="艺术与文化" />
          <InterestTag label="科学" />
          <InterestTag label="娱乐" />
          <InterestTag label="科技" />
          <InterestTag label="经济学" />
          <InterestTag label="体育" />
          <InterestTag label="生活方式" />
          <InterestTag label="设计" />
        </div>
        <SaveButton label="保存兴趣" />
      </div>*/}
    </div>
    
  );
};

export default DiscoverPage;