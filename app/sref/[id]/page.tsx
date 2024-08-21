import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Sref {
  id: number;
  name: string;
  images: string[];
  description: string;
  created_at: string;
}

async function getSref(id: string): Promise<Sref | null> {
  const { data, error } = await supabase
    .from('jh_srefs')
    .select('*')
    .eq('name', id)
    .single();

  if (error) {
    console.error('Error fetching sref:', error);
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const sref = await getSref(params.id);
  if (!sref) return { title: 'Sref not found' };

  return {
    title: sref.name,
    description: sref.description,
    openGraph: {
      title: sref.name,
      description: sref.description,
      images: sref.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: sref.name,
      description: sref.description,
      images: sref.images,
    },
  };
}

export default async function SrefDetailPage({ params }: { params: { id: string } }) {
  const sref = await getSref(params.id);

  if (!sref) {
    notFound();
  }

  return (
    <div className="sref-detail-page max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4">{sref.name}</h1>
          <p className="text-sm text-gray-500">Created at: {new Date(sref.created_at).toLocaleDateString()}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            {sref.images && sref.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sref.images.map((image, index) => (
                  <div key={index} className="relative h-64">
                    <Image
                      src={image}
                      alt={`${sref.name} - Image ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="prose max-w-none">
            <p>{sref.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}