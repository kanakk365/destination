"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
import News from "@/components/news"

export default function BlogPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isLightTheme = theme === "light"

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const response = await fetch(
          `https://blog.destinationkp.com/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${currentPage}`,
        )
        const data = await response.json()
        const totalPosts = response.headers.get("X-WP-Total")
        setTotalPages(Math.ceil(totalPosts / postsPerPage))

        const posts = data.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150) + "...",
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/placeholder.svg?height=300&width=400&text=Blog+Post",
          link: post.link, // WordPress blog post URL
          date: new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          author: {
            name: post._embedded?.author?.[0]?.name || "Unknown Author",
            image:
              post._embedded?.author?.[0]?.avatar_urls?.["96"] || "/placeholder.svg?height=40&width=40&text=Author",
          },
          categories: post._embedded?.["wp:term"]?.[0]?.map((cat) => cat.name) || [],
        }))

        setBlogPosts(posts)
      } catch (err) {
        console.error("Failed to fetch blog posts:", err)
        // Set empty array on error to show no posts
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={`min-h-screen ${isLightTheme ? "bg-white" : "bg-[rgb(16,16,20)]"}`}>
      <Navbar />

      <main className={`pt-20 ${isLightTheme ? "text-gray-800" : "text-white"}`}>
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
            {/* 3D Icon Header */}
            <div className="relative z-20 py-10">
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-5xl mx-auto text-center tracking-tight font-bold text-4xl md:text-5xl md:leading-tight mt-4 mb-4"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  All Blog Posts
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`text-base md:text-lg max-w-4xl my-4 mx-auto ${
                  isLightTheme ? "text-gray-600" : "text-gray-400"
                } font-normal text-center`}
              >
                Stay updated with the latest news, insights, and developments from Destination KP and the world of youth
                sports.
              </motion.h2>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className={`animate-pulse rounded-3xl ${isLightTheme ? "bg-gray-200" : "bg-neutral-800"} h-96`}
                  />
                ))}
              </div>
            ) : (
              <>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {blogPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    >
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl group ${
                          isLightTheme
                            ? "border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            : "border border-transparent hover:border-neutral-800 hover:bg-[rgb(20,20,24)]"
                        } w-full overflow-hidden hover:scale-[1.02] transition duration-200 block`}
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="transition duration-300 object-cover object-center w-full rounded-t-3xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div
                          className={`p-6 h-[200px] flex flex-col justify-between ${
                            isLightTheme ? "group-hover:bg-gray-50" : "group-hover:bg-[rgb(20,20,24)]"
                          }`}
                        >
                          <div>
                            <p
                              className={`text-lg font-bold mb-3 line-clamp-2 ${isLightTheme ? "text-gray-800" : "text-white"}`}
                            >
                              {post.title}
                            </p>
                            <p
                              className={`text-sm mt-2 line-clamp-3 ${isLightTheme ? "text-gray-600" : "text-gray-400"}`}
                            >
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex justify-end mt-4">
                            <p className={`text-xs ${isLightTheme ? "text-gray-500" : "text-gray-500"}`}>{post.date}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === 1
                          ? isLightTheme
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-neutral-800 text-gray-600 cursor-not-allowed"
                          : isLightTheme
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-neutral-800 text-white hover:bg-neutral-700"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex space-x-2">
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-lg transition-colors ${
                                currentPage === page
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                  : isLightTheme
                                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    : "bg-neutral-800 text-white hover:bg-neutral-700"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span
                              key={page}
                              className={`w-10 h-10 flex items-center justify-center ${isLightTheme ? "text-gray-400" : "text-gray-600"}`}
                            >
                              ...
                            </span>
                          )
                        }
                        return null
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === totalPages
                          ? isLightTheme
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-neutral-800 text-gray-600 cursor-not-allowed"
                          : isLightTheme
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-neutral-800 text-white hover:bg-neutral-700"
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* Newsletter Section */}
        <Newsletter />

        {/* News/Blogs Section */}
        <News />
      </main>

      <Footer />
    </div>
  )
}
