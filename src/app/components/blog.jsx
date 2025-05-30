// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";
// import { useEffect, useState } from "react";

// function BlogPage({ blog }) {
//   return (
//     <>
//       {/* Blog Content */}
//       <h1>{blog.title}</h1>
//       <p>{blog.content}</p>
//     </>
//   );
// }

// export default function Blog() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://api.360xpertsolutions.com/api/blog-pages"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Blogs data:", data);
//         setBlogs(data.data || []);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//         setError("Failed to load blogs. Please try again later.");
//         setBlogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Top section */}
//       <div className="mb-12">
//         <div className="inline-block">
//           <Link
//             href="#"
//             className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
//           >
//             News & Blogs
//           </Link>
//         </div>

//         <div className="mt-8 flex justify-between items-start">
//           <div className="max-w-4xl">
//             <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
//               Let&apos;s Talk NetSuite{" "}
//               <span className="text-black">Tips, Trends & Tutorials</span>
//             </h1>
//             <p className="text-xl text-gray-600">
//               Stay ahead in the world of ERP with expert insights, practical
//               tips, and the latest updates on NetSuite
//             </p>
//           </div>

//           <Link
//             href="#"
//             className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </Link>
//         </div>
//       </div>

//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center items-center min-h-[300px]">
//           <div className="animate-pulse text-gray-500">Loading blogs...</div>
//         </div>
//       )}

//       {/* Error state */}
//       {error && (
//         <div className="flex justify-center items-center min-h-[300px]">
//           <div className="text-red-500">{error}</div>
//         </div>
//       )}

//       {/* Empty state */}
//       {!loading && !error && blogs.length === 0 && (
//         <div className="flex justify-center items-center min-h-[300px]">
//           <div className="text-gray-500">No blogs available</div>
//         </div>
//       )}

//       {/* Cards section - Simplified to only show image, title, description, and Read More */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//         {blogs.map((blog) => {
//           // Get the image URL directly from the content array
//           const imageUrl = blog?.attributes?.content?.[0]?.image?.url;

//           // If the URL doesn't start with http, prepend the API domain
//           const fullImageUrl = imageUrl
//             ? imageUrl.startsWith("http")
//               ? imageUrl
//               : `https://api.360xpertsolutions.com${imageUrl}`
//             : null;

//           return (
//             <div
//               key={blog.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//               id="Blogs"
//             >
//               <div className="p-4 h-64 relative">
//                 {fullImageUrl ? (
//                   <Image
//                     src={fullImageUrl}
//                     alt={blog.attributes.title || "Blog image"}
//                     fill
//                     className="object-cover rounded-lg"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     priority={false}
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
//                     <span className="text-gray-500">No image available</span>
//                   </div>
//                 )}
//               </div>
//               <div className="p-6">
//               {/* Wrap entire content in Link component */}
//               <Link 
//                href={`/blog/${blog.attributes.slug || blog.id}`}
//                className="block group" // Make the link behave like a block element
//               >
//                {/* Only show title */}
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                  {blog.attributes.title}
//                 </h2>

//                 {/* Only show description */}
//                 <p className="text-gray-600 mb-4 line-clamp-3">
//                  {blog.attributes.description || "No description available"}
//                 </p>

//                 {/* Read More button - now part of the clickable area */}
//                 <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors inline-flex items-center">
//                  Read More <ChevronRight className="w-4 h-4 ml-1" />
//                 </div>
//               </Link>
//              </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function BlogPage({ blog }) {
  return (
    <>
      {/* Blog Content */}
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef();

const scrollLeft = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
  }
};


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.360xpertsolutions.com/api/blog-pages"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Blogs data:", data);
        setBlogs(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top section */}
      <div className="mb-12">
        <div className="inline-block">
          <Link
            href="#"
            className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            News & Blogs
          </Link>
        </div>

        <div className="mt-8 flex justify-between items-start">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Let&apos;s Talk NetSuite{" "}
              <span className="text-black">Tips, Trends & Tutorials</span>
            </h1>
            <p className="text-xl text-gray-600">
              Stay ahead in the world of ERP with expert insights, practical
              tips, and the latest updates on NetSuite
            </p>
          </div>

          
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-gray-500">Loading blogs...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && blogs.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-gray-500">No blogs available</div>
        </div>
      )}

      {/* Cards section */}
     <div id="Blogs" className="relative mt-12" >
  {/* Scroll Left Button */}
  <button
    onClick={scrollLeft}
    
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 shadow rounded-full px-3 py-2.5 hover:bg-blue-700 transition text-white"
    aria-label="Scroll Left"
  >
    <ChevronLeft className="w-6 h-7" />
  </button>

  {/* Scrollable Cards */}
  <div
    ref={scrollRef}
    className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-12"
  >
    {blogs.map((blog) => {
      const imageUrl = blog?.attributes?.content?.[0]?.image?.url;
      const fullImageUrl = imageUrl
        ? imageUrl.startsWith("http")
          ? imageUrl
          : `https://api.360xpertsolutions.com${imageUrl}`
        : null;

      const slug = blog.attributes.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return (
        <div
          key={blog.id}
          className="snap-start bg-white rounded-lg shadow-md overflow-hidden min-w-[320px] max-w-[340px] mb-3 flex-shrink-0"
        >
          <div className="h-64  relative">
            {fullImageUrl ? (
              <Image
                src={fullImageUrl}
                alt={blog.attributes.title || "Blog image"}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-500 text-sm">No image available</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <Link href={`/blog/${slug}`} className="block group">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                {blog.attributes.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {blog.attributes.description || "No description available"}
              </p>
              <span className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition">
                Read More <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      );
    })}
  </div>

  {/* Scroll Right Button */}
  <button
    onClick={scrollRight}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 shadow rounded-full px-3 py-2.5 hover:bg-blue-700 transition text-white"
    aria-label="Scroll Right"
  >
   <ChevronRight className="w-6 h-7" />
  </button>
</div>

    </div>
  );
}