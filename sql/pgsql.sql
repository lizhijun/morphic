CREATE TABLE markdown_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id)
);

CREATE INDEX markdown_files_slug_idx ON markdown_files (slug);