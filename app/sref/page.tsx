import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Type for our Sref data
interface Sref {
  id: number;
  name: string;
  images: string[];
  description: string;
  // Add other fields as needed
}

async function getSrefs() {
  const { data, error } = await supabase
    .from('jh_srefs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Sref[];
}

export default async function SrefListPage() {
  const srefs = await getSrefs();

  return (
    <div className="sref-list-page p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Sref List</h1>
      
      <div className="sref-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {srefs.map((sref) => (
          <Link href={`/sref/${sref.name}`} key={sref.id}>
            <div className="sref-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                {sref.images && sref.images.length > 0 && (
                  <Image
                    src={sref.images[0]}
                    alt={sref.name}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{sref.name}</h2>
                <p className="text-gray-600 truncate">{sref.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}