"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Newspaper, ChevronRight } from "lucide-react"
import { ButtonColorful } from "@/components/ui/button-colorful"
import { useTheme } from "next-themes"

export default function News() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  // Featured blog posts
  const [featuredPosts, setFeaturedPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("https://blog.destinationkp.com/wp-json/wp/v2/posts?_embed&per_page=3")
        const data = await response.json()

        const posts = data.map((post) => ({
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 120) + "...", // strip HTML and truncate
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          link: post.link, // ✅ original blog link
          date: new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          author: {
            name: post._embedded?.author?.[0]?.name || "Unknown",
            image: post._embedded?.author?.[0]?.avatar_urls?.["96"] || "",
          },
        }))

        setFeaturedPosts(posts)
      } catch (err) {
        console.error("Failed to fetch blog posts:", err)
      }
    }

    fetchPosts()
  }, [])

  // More blog posts
  const morePosts = [
    {
      title: "Youth Sports Programs Announced",
      excerpt:
        "Destination KP has unveiled its initial lineup of youth sports programs that will be offered when the facility opens in 2026.",
      slug: "youth-sports-programs",
      date: "February 28, 2024",
      author: {
        name: "Ben Saull",
        image: "https://i.postimg.cc/Gm8jSsmt/Ben-Saull-Ari.webp",
      },
    },
    {
      title: "Economic Impact Study Released",
      excerpt:
        "A new study projects that Destination KP will generate significant economic benefits for Kings Park and surrounding communities.",
      slug: "economic-impact-study",
      date: "February 15, 2024",
      author: {
        name: "Anthony Orso",
        image: "https://i.postimg.cc/vZcPFN3Q/anthony-orso.jpg",
      },
    },
    {
      title: "Architectural Renderings Revealed",
      excerpt:
        "Destination KP has released the first architectural renderings of the planned sports complex, showcasing its modern design and extensive facilities.",
      slug: "architectural-renderings",
      date: "January 30, 2024",
      author: {
        name: "Gid Pfeffer",
        image: "https://i.postimg.cc/DZgQbrBj/gidpfeffer.webp",
      },
    },
  ].map((post) => ({
    ...post,
    excerpt: post.excerpt.substring(0, 120) + "...",
  }))

  return (
    <section
      id="news"
      className={`py-20 ${isLightTheme ? "bg-white" : "bg-[rgb(16,16,20)]"} ${isLightTheme ? "text-gray-800" : "text-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between pb-20">
        {/* 3D Icon Header */}
        <div className="relative z-20 py-10 md:pt-20">
          <div className="[perspective:400px] [transform-style:preserve-3d]">
            <motion.div
              initial={{ opacity: 0, rotateX: 0 }}
              animate={{ opacity: 1, rotateX: 25 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`h-14 w-14 p-[4px] rounded-md ${
                isLightTheme
                  ? "bg-gradient-to-b from-gray-200 to-gray-300"
                  : "bg-gradient-to-b from-neutral-800 to-neutral-950"
              } mx-auto relative`}
              style={{ transformOrigin: "center center" }}
            >
              <div
                className={`${
                  isLightTheme ? "bg-white" : "bg-[rgb(20,20,24)]"
                } rounded-[5px] h-full w-full relative z-20 flex justify-center items-center overflow-hidden`}
              >
                <Newspaper className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600" />
              </div>
              <div
                className={`absolute bottom-0 inset-x-0 ${
                  isLightTheme ? "bg-gray-400" : "bg-neutral-600"
                } opacity-50 rounded-full blur-lg h-4 w-full mx-auto z-30`}
              ></div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-purple-600 to-transparent h-px w-[60%] mx-auto"></div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-blue-600 blur-sm to-transparent h-[8px] w-[60%] mx-auto"></div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-5xl mx-auto text-center tracking-tight font-bold text-4xl md:text-5xl md:leading-tight mt-4 mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Stay Updated
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-base md:text-lg max-w-4xl my-4 mx-auto ${
              isLightTheme ? "text-gray-600" : "text-gray-400"
            } font-normal text-center`}
          >
            Discover the latest news, updates, and insights about Destination KP and youth sports in Long Island.
          </motion.h2>
        </div>

        {/* Featured Blog Posts Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Link
                href={post.link}
                className={`shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl group ${
                  isLightTheme
                    ? "border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    : "border border-transparent hover:border-neutral-800 hover:bg-[rgb(20,20,24)]"
                } w-full overflow-hidden hover:scale-[1.02] transition duration-200 block`}
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="transition duration-300 object-cover object-center w-full rounded-t-3xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    priority={index === 0}
                  />
                </div>
                <div
                  className={`p-4 md:p-8 h-[220px] flex flex-col justify-between ${isLightTheme ? "group-hover:bg-gray-50" : "group-hover:bg-[rgb(20,20,24)]"}`}
                >
                  <p className={`text-xl font-bold mb-4 ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                    {post.title}
                  </p>
                  <p
                    className={`text-left text-base mt-2 h-[80px] line-clamp-3 overflow-hidden ${isLightTheme ? "text-gray-600" : "text-gray-400"}`}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* More Posts Section */}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Link href="https://blog.destinationkp.com/" target="_blank" rel="noopener noreferrer">
            <ButtonColorful
              label="View All Posts"
              icon={<ChevronRight className="w-3.5 h-3.5 text-white" />}
              className="h-11 px-6"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
