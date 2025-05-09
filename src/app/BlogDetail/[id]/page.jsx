'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from "next/image";

const BlogDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [blogPost, setBlogPost] = useState(null); // For storing blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      // Fetching blog data from API
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          if (data?.data) {
            setBlogPost(data.data); // Set fetched blog data
          } else {
            setError('No data found for this blog post');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error:', err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogPost) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mt-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#181815] text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6">{blogPost.attributes.title}</h1>

        <div className="space-y-6">
          {blogPost.attributes.content.map((content, index) => (
            <div key={index} className="mb-4">
              {content.type === 'image' && content.image && (
                <div className="relative w-full h-80 mb-4">
                  <Image
                    src={content.image.url}
                    alt={content.image.alternativeText || 'Blog Image'}
                    width={800} // Example width
                    height={450} // Example height
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              {content.type === 'paragraph' && (
                <p className="text-lg leading-relaxed">{content.children[0]?.text}</p>
              )}
              {content.type === 'heading' && (
                <h3 className="text-2xl font-semibold mt-4 mb-2">
                  {content.children[0]?.text}
                </h3>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;