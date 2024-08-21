'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';


const R2_ENDPOINT = 'https://<YOUR_ACCOUNT_ID>.r2.cloudflarestorage.com';
const R2_ACCESS_KEY_ID = 'YOUR_R2_ACCESS_KEY_ID';
const R2_SECRET_ACCESS_KEY = 'YOUR_R2_SECRET_ACCESS_KEY';
const R2_BUCKET_NAME = 'YOUR_R2_BUCKET_NAME';

const MarkdownSaveForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除非单词/空格/连字符字符
      .replace(/\s+/g, '-') // 将空格替换为连字符
      .replace(/--+/g, '-') // 将多个连字符替换为单个连字符
      .trim(); // 移除首尾空格
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const uploadImageToR2 = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    
    const response = await fetch('/api/sign-r2-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, contentType: file.type }),
    });

    if (!response.ok) {
      throw new Error('Failed to get signed URL');
    }

    const { signedUrl } = await response.json();

    const uploadResponse = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image to R2');
    }

    return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = generateSlug(title);

    try {
      let coverImageUrl = '';
      if (coverImage) {
        coverImageUrl = await uploadImageToR2(coverImage);
      }

      const { data, error } = await supabase
        .from('markdown_files')
        .insert([
          { title, content, slug, cover_image_url: coverImageUrl }
        ]);

      if (error) throw error;

      setMessage(`Markdown 文件保存成功！链接: /page/${slug}`);
      setTitle('');
      setContent('');
      setCoverImage(null);
    } catch (error) {
      setMessage('保存失败，请重试。');
      console.error('Error saving markdown:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2">标题：</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="coverImage" className="block mb-2">封面图：</label>
        <input
          type="file"
          id="coverImage"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2">Markdown 内容：</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-64"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        保存
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
};

export default MarkdownSaveForm;