import React from 'react';
import { BlogCard, FeaturedBlogCard, InterestTag, SaveButton } from '@/components/BlogComponents';
import Link from 'next/link';

const DiscoverPage = () => {
  return (
    <div className="discover-page p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">发现</h1>
      
      <div className="featured-blog mb-12">
        <Link href="/page/new-york-garbage-mafia" passHref>
          <FeaturedBlogCard
            imageUrl="/images/new-york-mafia.jpg"
            title="The History of New York Garbage Mafia"
            description="The New York garbage mafia cartel, a criminal enterprise controlled by Italian-American crime families, dominated the city's private waste collection industry for..."
            author="twombly"
          />
        </Link>
      </div>
      
      <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link href="/page/end-of-magnetic-stripe" passHref>
          <BlogCard
            imageUrl="/images/magnetic-stripe.jpg"
            title="The End of the Magnetic Stripe"
            description="Mastercard's decision to phase out magnetic stripe..."
            author="twombly"
          />
        </Link>
        <Link href="/page/physicists-studying-mayo" passHref>
          <BlogCard
            imageUrl="/images/mayo-study.jpg"
            title="Why Physicists are Studying Mayo"
            description="Physicists are turning to an unlikely source in their..."
            author="twombly"
          />
        </Link>
        <Link href="/page/citadel-dumps-nvidia-stock" passHref>
          <BlogCard
            imageUrl="/images/citadel-nvidia.jpg"
            title="Citadel Dumps NVIDIA Stock"
            description="Citadel's recent decision to significantly reduce its..."
            author="twombly"
          />
        </Link>
      </div>
      
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
      </div>
    </div>
  );
};

export default DiscoverPage;