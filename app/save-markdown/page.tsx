import React from 'react';
import MarkdownSaveForm from '@/components/MarkdownSaveForm';

const SaveMarkdownPage = () => {
  return (
    <div className="save-markdown-page p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">保存 Markdown 文件</h1>
      <MarkdownSaveForm />
    </div>
  );
};

export default SaveMarkdownPage;