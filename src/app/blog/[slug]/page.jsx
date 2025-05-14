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
import { useEffect, useState } from "react";
import Experts from "../../components/experts";
import Blog from "../../components/blog";
import Chatform from "../../components/Chatform";
import Footer from "../../components/footer";

export default function BlogDetail({ params }) {
  // Unwrap the params promise using React.use()
  const { slug } = React.use(params);
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

  const { title, description, content, publishedAt } = blog.attributes;
  const publishedDate = new Date(publishedAt).toLocaleDateString();

  const renderContent = (contentItem, index) => {
    // Handle images
    if (contentItem.type === "image" && contentItem.image) {
      return (
        <div key={index} className="relative w-full h-80 mb-6">
          <Image
            src={contentItem.image.url}
            alt={contentItem.image.alternativeText || "Blog Image"}
            width={800}
            height={450}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      );
    }

    // Handle paragraphs
    if (contentItem.type === "paragraph") {
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {contentItem.children.map((child, childIndex) => {
            if (child.text.includes("##")) {
              return (
                <h2 key={childIndex} className="text-2xl font-bold my-4">
                  {child.text.replace("##", "")}
                </h2>
              );
            }
            return (
              <React.Fragment key={childIndex}>
                {child.text.split("\n").map((text, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {text}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </p>
      );
    }

    // Handle headings
    if (contentItem.type === "heading") {
      const HeadingTag = `h${contentItem.level}`;
      return (
        <HeadingTag
          key={index}
          className={`text-${contentItem.level === 3 ? 'xl' : '2xl'} font-bold my-4`}
        >
          {contentItem.children[0].text}
        </HeadingTag>
      );
    }

    // Handle lists
    if (contentItem.type === "list") {
      const ListTag = contentItem.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag key={index} className="list-disc pl-6 mb-4">
          {contentItem.children.map((listItem, liIndex) => (
            <li key={liIndex} className="mb-2">
              {listItem.children.map((child, childIndex) => (
                <React.Fragment key={childIndex}>
                  {child.bold ? <strong>{child.text}</strong> : child.text}
                </React.Fragment>
              ))}
            </li>
          ))}
        </ListTag>
      );
    }

    return null;
  };

  return (
    <div className="p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 mb-6">Published on: {publishedDate}</p>
        <p className="text-gray-600 mb-6 text-lg">{description}</p>

        {content.map((contentItem, index) => (
          <React.Fragment key={index}>
            {renderContent(contentItem, index)}
          </React.Fragment>
        ))}
      </div>
      <Blog />
      <Experts />
      <Chatform />
      <Footer />
    </div>
  );
}