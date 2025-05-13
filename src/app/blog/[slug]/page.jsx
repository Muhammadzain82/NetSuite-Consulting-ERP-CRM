// "use client";
// import Header from "../../components/header";
// import Image from "next/image";
// import { useEffect, useState } from "react"; // Added missing imports
// import Experts from "../../components/experts";
// import Blog from "../../components/blog";
// import Chatform from "../../components/Chatform";
// import Footer from "../../components/footer";

// export default function BlogDetail({ params }) {
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogDetail = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://api.360xpertsolutions.com/api/blog-pages/${params.slug}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setBlog(data.data || null);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching blog detail:", err);
//         setError("Failed to load blog. Please try again later.");
//         setBlog(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogDetail();
//   }, [params.slug]);

//   if (loading) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-[300px]">
//         <div className="animate-pulse text-gray-500">Loading blog...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-[300px]">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-[300px]">
//         <div className="text-gray-500">Blog not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <Header />
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold mb-4">{blog.attributes.title}</h1>
//         {blog.attributes.featuredImage?.data?.attributes?.url && (
//           <div className="relative h-96 mb-6">
//             <Image
//               src={blog.attributes.featuredImage.data.attributes.url}
//               alt={
//                 blog.attributes.featuredImage.data.attributes.alternativeText ||
//                 blog.attributes.title
//               }
//               fill
//               className="object-cover rounded-lg"
//             />
//           </div>
//         )}
//         <p className="text-gray-600 mb-6">{blog.attributes.description}</p>
//         {/* Add more fields as needed */}
//       </div>
//       <Blog/>
//       <Experts/>
//       <Chatform/>
//       <Footer/>
//     </div>
//   );
// }

"use client";
import React from "react";
import Header from "../../components/header";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import Experts from "../../components/experts";
import Blog from "../../components/blog";
import Chatform from "../../components/Chatform";
import Footer from "../../components/footer";

export default function BlogDetail({ params }) {
  const {slug} = React.use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.360xpertsolutions.com/api/blog-pages/${slug}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBlog(data.data || null);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog detail:", err);
        setError("Failed to load blog. Please try again later.");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse text-gray-500">Loading blog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <div className="text-gray-500">Blog not found</div>
      </div>
    );
  }

  const { title, description, content } = blog.attributes;

  return (
    <div className="p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

         <p className="text-gray-600 mb-6">{description}</p>

        {Array.isArray(content) && content.length > 0 && content[0].type === "image" && content[0].image && (
          <div className="relative w-full h-80 mb-6">
            <Image
              src={content[0].image.url}
              alt={content[0].image.alternativeText || "Blog Image"}
              width={800}
              height={450}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

       
        <div className="space-y-6">
          {blog.attributes.content.map((content, index) => {
              if (index === 0 && content.type === "image") return null;

              return (
                <div key={index} className="mb-4">
                  {content.type === "image" && content.image && (
                    <div className="relative w-full h-80 mb-4">
                      <Image
                        src={content.image.url}
                        alt={content.image.alternativeText || "Blog Image"}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  )}

                  {content.content === "text" && (
                    <p className="text-gray-700 leading-relaxed">{content.text}</p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <Blog />
      <Experts />
      <Chatform />
      <Footer />
    </div>
  );
}