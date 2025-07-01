"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, MapPin, Briefcase, Users, Building, Megaphone, GraduationCap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import JobApplicationForm from "@/components/job-application-form"
import Contact from "@/components/contact"
import Newsletter from "@/components/newsletter"
import News from "@/components/news"

export default function CareerPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [applyingForJob, setApplyingForJob] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("operations")

  const toggleJob = (id: string) => {
    if (expandedJob === id) {
      setExpandedJob(null)
    } else {
      setExpandedJob(id)
    }
  }

  const handleApply = (jobTitle: string) => {
    setApplyingForJob(jobTitle)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelApplication = () => {
    setApplyingForJob(null)
  }

  const departments = [
    { id: "operations", name: "Operations", icon: Building },
    { id: "facilities", name: "Facilities", icon: Users },
    { id: "marketing", name: "Marketing & Advertising", icon: Megaphone },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "internships", name: "Internships", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-20">
        {applyingForJob ? (
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={handleCancelApplication}
                className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ChevronDown className="h-5 w-5 rotate-90 mr-1" />
                <span>Back to job listings</span>
              </button>
              <JobApplicationForm jobTitle={applyingForJob} onCancel={handleCancelApplication} />
            </div>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <section className="mb-16">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Join Our Team
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore exciting career opportunities at Destination KP, the largest youth sports facility on Long
                  Island. From full-time positions to internships, find your place in sports, technology, and community.
                </p>
              </div>
            </section>

            {/* Department Tabs */}
            <section className="mb-12">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {departments.map((dept) => {
                    const IconComponent = dept.icon
                    return (
                      <button
                        key={dept.id}
                        onClick={() => setActiveTab(dept.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeTab === dept.id
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        {dept.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Jobs Section */}
            <section>
              <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                  {/* Operations */}
                  {activeTab === "operations" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <JobListing
                        id="concert-event-coordinator"
                        title="Concert and Event Coordinator"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "concert-event-coordinator"}
                        toggleExpanded={() => toggleJob("concert-event-coordinator")}
                        onApply={() => handleApply("Concert and Event Coordinator")}
                        overview="Lead the planning and execution of concerts, tournaments, and special events at Destination KP. Coordinate with vendors, performers, and staff to ensure seamless event experiences."
                        responsibilities={[
                          "Plan and coordinate large-scale events, concerts, and tournaments",
                          "Manage vendor relationships and contract negotiations",
                          "Oversee event setup, execution, and breakdown",
                          "Coordinate with security, catering, and technical teams",
                          "Develop event timelines and manage budgets",
                          "Ensure compliance with safety regulations and permits",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Event Management, Hospitality, or related field",
                          "3+ years of event coordination experience",
                          "Strong project management and organizational skills",
                          "Experience with large venue events preferred",
                          "Excellent communication and leadership abilities",
                        ]}
                      />

                      <JobListing
                        id="administrative-assistant"
                        title="Administrative Assistant"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "administrative-assistant"}
                        toggleExpanded={() => toggleJob("administrative-assistant")}
                        onApply={() => handleApply("Administrative Assistant")}
                        overview="Provide comprehensive administrative support to the management team and various departments at Destination KP. Handle daily operations, scheduling, and communication coordination."
                        responsibilities={[
                          "Manage executive calendars and schedule meetings",
                          "Handle correspondence and communication with stakeholders",
                          "Maintain filing systems and database records",
                          "Coordinate travel arrangements and expense reports",
                          "Assist with project coordination and documentation",
                          "Support HR functions and employee onboarding",
                        ]}
                        qualifications={[
                          "High school diploma required, Associate's degree preferred",
                          "2+ years of administrative experience",
                          "Proficiency in Microsoft Office Suite",
                          "Strong organizational and multitasking abilities",
                          "Excellent written and verbal communication skills",
                        ]}
                      />

                      <JobListing
                        id="front-desk"
                        title="Front Desk Representative"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "front-desk"}
                        toggleExpanded={() => toggleJob("front-desk")}
                        onApply={() => handleApply("Front Desk Representative")}
                        overview="Serve as the first point of contact for visitors, athletes, and families at Destination KP. Provide exceptional customer service and facility information."
                        responsibilities={[
                          "Greet and assist visitors, athletes, and families",
                          "Handle facility bookings and registration processes",
                          "Manage phone calls and direct inquiries appropriately",
                          "Process payments and maintain cash handling procedures",
                          "Provide facility tours and information to guests",
                          "Maintain lobby area and ensure professional appearance",
                        ]}
                        qualifications={[
                          "High school diploma or equivalent",
                          "Customer service experience preferred",
                          "Strong interpersonal and communication skills",
                          "Basic computer skills and cash handling experience",
                          "Ability to work flexible hours including weekends",
                        ]}
                      />
                    </div>
                  )}

                  {/* Facilities */}
                  {activeTab === "facilities" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <JobListing
                        id="athletic-trainers"
                        title="Athletic Trainers"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "athletic-trainers"}
                        toggleExpanded={() => toggleJob("athletic-trainers")}
                        onApply={() => handleApply("Athletic Trainers")}
                        overview="Provide injury prevention, assessment, and rehabilitation services to athletes at Destination KP. Ensure athlete safety and optimal performance through professional sports medicine care."
                        responsibilities={[
                          "Conduct injury assessments and provide immediate care",
                          "Develop and implement injury prevention programs",
                          "Provide rehabilitation services and exercise programs",
                          "Maintain detailed medical records and documentation",
                          "Coordinate with physicians and healthcare providers",
                          "Educate athletes and coaches on injury prevention",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Athletic Training or related field",
                          "BOC certification and state licensure",
                          "CPR/AED certification required",
                          "Experience working with youth athletes preferred",
                          "Strong knowledge of sports medicine and rehabilitation",
                        ]}
                      />

                      <JobListing
                        id="grounds-keeper"
                        title="Grounds Keeper"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "grounds-keeper"}
                        toggleExpanded={() => toggleJob("grounds-keeper")}
                        onApply={() => handleApply("Grounds Keeper")}
                        overview="Maintain the outdoor fields, landscaping, and grounds at Destination KP to ensure optimal playing conditions and aesthetic appeal."
                        responsibilities={[
                          "Maintain and prepare athletic fields for games and practices",
                          "Perform landscaping duties including mowing, trimming, and planting",
                          "Operate and maintain grounds equipment and machinery",
                          "Monitor field conditions and implement improvement plans",
                          "Coordinate field scheduling and usage",
                          "Ensure compliance with safety and environmental standards",
                        ]}
                        qualifications={[
                          "High school diploma or equivalent",
                          "Experience in grounds maintenance or landscaping",
                          "Knowledge of turf management and field maintenance",
                          "Ability to operate various grounds equipment",
                          "Physical ability to work outdoors in various weather conditions",
                        ]}
                      />

                      <JobListing
                        id="broadcasters"
                        title="Broadcasters"
                        location="Kings Park, NY / Remote"
                        type="Part-time"
                        expanded={expandedJob === "broadcasters"}
                        toggleExpanded={() => toggleJob("broadcasters")}
                        onApply={() => handleApply("Broadcasters")}
                        overview="Provide live commentary and broadcasting services for youth sports events through HubT's Youth Sports Network (YSN) at Destination KP."
                        responsibilities={[
                          "Deliver engaging play-by-play commentary for live sports events",
                          "Prepare pre-game research and player/team information",
                          "Operate broadcasting equipment and streaming software",
                          "Conduct interviews with coaches, players, and officials",
                          "Maintain professional on-air presence and voice quality",
                          "Collaborate with production team for seamless broadcasts",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Communications, Journalism, or related field",
                          "Experience in sports broadcasting or commentary",
                          "Strong voice projection and speaking abilities",
                          "Knowledge of youth sports rules and regulations",
                          "Comfortable working with broadcasting technology",
                        ]}
                      />

                      <JobListing
                        id="referees"
                        title="Referees"
                        location="Kings Park, NY"
                        type="Part-time"
                        expanded={expandedJob === "referees"}
                        toggleExpanded={() => toggleJob("referees")}
                        onApply={() => handleApply("Referees")}
                        overview="Officiate youth sports games and tournaments at Destination KP, ensuring fair play and adherence to rules and regulations."
                        responsibilities={[
                          "Officiate games according to official rules and regulations",
                          "Maintain control of games and ensure player safety",
                          "Make fair and consistent calls throughout competitions",
                          "Communicate effectively with coaches, players, and spectators",
                          "Complete game reports and incident documentation",
                          "Participate in ongoing training and certification programs",
                        ]}
                        qualifications={[
                          "Current officiating certification in relevant sports",
                          "Knowledge of youth sports rules and regulations",
                          "Strong decision-making and conflict resolution skills",
                          "Physical fitness to keep up with game pace",
                          "Excellent communication and interpersonal skills",
                        ]}
                      />
                    </div>
                  )}

                  {/* Marketing & Advertising */}
                  {activeTab === "marketing" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <JobListing
                        id="social-media-manager"
                        title="Social Media Manager"
                        location="Kings Park, NY / Remote"
                        type="Full-time"
                        expanded={expandedJob === "social-media-manager"}
                        toggleExpanded={() => toggleJob("social-media-manager")}
                        onApply={() => handleApply("Social Media Manager")}
                        overview="Lead Destination KP's social media strategy across all platforms, creating engaging content and building community engagement around youth sports and facility events."
                        responsibilities={[
                          "Develop and execute comprehensive social media strategies",
                          "Create engaging content including graphics, videos, and posts",
                          "Manage multiple social media platforms and communities",
                          "Analyze performance metrics and optimize content strategy",
                          "Coordinate with event teams for live coverage",
                          "Build partnerships with influencers and community organizations",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Marketing, Communications, or related field",
                          "3+ years of social media management experience",
                          "Proficiency in social media management tools and analytics",
                          "Strong creative and visual design skills",
                          "Experience with video editing and graphic design software",
                        ]}
                      />

                      <JobListing
                        id="advertising-business-development"
                        title="Advertising and Business Development Manager"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "advertising-business-development"}
                        toggleExpanded={() => toggleJob("advertising-business-development")}
                        onApply={() => handleApply("Advertising and Business Development Manager")}
                        overview="Drive revenue growth through strategic partnerships, sponsorships, and advertising opportunities at Destination KP. Develop relationships with local businesses and organizations."
                        responsibilities={[
                          "Identify and pursue new business development opportunities",
                          "Develop and maintain corporate partnerships and sponsorships",
                          "Create advertising packages and promotional materials",
                          "Negotiate contracts and manage client relationships",
                          "Coordinate with marketing team on promotional campaigns",
                          "Track revenue goals and performance metrics",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Business, Marketing, or related field",
                          "5+ years of business development or sales experience",
                          "Strong negotiation and relationship-building skills",
                          "Experience with sports marketing or facility management preferred",
                          "Proven track record of meeting revenue targets",
                        ]}
                      />
                    </div>
                  )}

                  {/* Education */}
                  {activeTab === "education" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <JobListing
                        id="post-grad-teachers"
                        title="Post Grad Program Teachers"
                        location="Kings Park, NY"
                        type="Full-time"
                        expanded={expandedJob === "post-grad-teachers"}
                        toggleExpanded={() => toggleJob("post-grad-teachers")}
                        onApply={() => handleApply("Post Grad Program Teachers")}
                        overview="Provide academic instruction and mentorship to post-graduate student-athletes in Destination KP's educational programs, combining athletics with academic excellence."
                        responsibilities={[
                          "Develop and deliver curriculum for post-graduate students",
                          "Provide individualized academic support and tutoring",
                          "Monitor student progress and maintain academic records",
                          "Coordinate with athletic staff on student-athlete development",
                          "Prepare students for college entrance exams and applications",
                          "Maintain communication with parents and guardians",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Education or subject-specific field",
                          "Teaching certification preferred",
                          "Experience working with high school or college-age students",
                          "Strong knowledge of college preparation and admissions",
                          "Excellent communication and mentoring skills",
                        ]}
                      />

                      <JobListing
                        id="post-grad-assistants"
                        title="Post Grad Program Assistants"
                        location="Kings Park, NY"
                        type="Part-time"
                        expanded={expandedJob === "post-grad-assistants"}
                        toggleExpanded={() => toggleJob("post-grad-assistants")}
                        onApply={() => handleApply("Post Grad Program Assistants")}
                        overview="Support the Post Grad Program teachers and students with academic assistance, study hall supervision, and student development activities."
                        responsibilities={[
                          "Assist teachers with classroom management and instruction",
                          "Supervise study halls and academic support sessions",
                          "Provide one-on-one tutoring and academic assistance",
                          "Help coordinate student activities and college visits",
                          "Maintain student attendance and progress records",
                          "Support college application and scholarship processes",
                        ]}
                        qualifications={[
                          "Bachelor's degree in Education or related field",
                          "Experience working with students in academic settings",
                          "Strong organizational and communication skills",
                          "Ability to work flexible hours",
                          "Passion for student development and success",
                        ]}
                      />
                    </div>
                  )}

                  {/* Internships */}
                  {activeTab === "internships" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <JobListing
                        id="physical-therapist-trainers-intern"
                        title="Physical Therapist and Trainers Intern"
                        location="Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "physical-therapist-trainers-intern"}
                        toggleExpanded={() => toggleJob("physical-therapist-trainers-intern")}
                        onApply={() => handleApply("Physical Therapist and Trainers Intern")}
                        overview="Gain hands-on experience in sports medicine and physical therapy while working with youth athletes at Destination KP under the supervision of licensed professionals."
                        responsibilities={[
                          "Assist with injury assessments and rehabilitation programs",
                          "Support athletic trainers during practices and games",
                          "Help maintain medical equipment and supplies",
                          "Document treatment sessions and progress notes",
                          "Participate in injury prevention education programs",
                          "Observe and assist with various therapeutic techniques",
                        ]}
                        qualifications={[
                          "Currently pursuing degree in Physical Therapy, Athletic Training, or related field",
                          "Basic knowledge of anatomy and sports medicine",
                          "CPR certification preferred",
                          "Strong interpersonal and communication skills",
                          "Ability to work with youth athletes",
                        ]}
                      />

                      <JobListing
                        id="social-media-intern-general"
                        title="Social Media Intern"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "social-media-intern-general"}
                        toggleExpanded={() => toggleJob("social-media-intern-general")}
                        onApply={() => handleApply("Social Media Intern")}
                        overview="Support Destination KP's social media efforts by creating content, engaging with followers, and helping to build our online community presence."
                        responsibilities={[
                          "Create engaging social media content for various platforms",
                          "Assist with photography and videography at events",
                          "Monitor social media channels and engage with followers",
                          "Help develop social media campaigns and strategies",
                          "Track analytics and prepare performance reports",
                          "Support live event coverage and real-time posting",
                        ]}
                        qualifications={[
                          "Currently pursuing degree in Marketing, Communications, or related field",
                          "Strong understanding of social media platforms",
                          "Basic graphic design and video editing skills",
                          "Creative mindset and attention to detail",
                          "Excellent written communication skills",
                        ]}
                      />

                      <JobListing
                        id="website-design-marketing-intern"
                        title="Website Design and Marketing Intern"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "website-design-marketing-intern"}
                        toggleExpanded={() => toggleJob("website-design-marketing-intern")}
                        onApply={() => handleApply("Website Design and Marketing Intern")}
                        overview="Assist with website development, digital marketing initiatives, and online presence optimization for Destination KP and its various programs."
                        responsibilities={[
                          "Support website design and development projects",
                          "Assist with SEO optimization and content management",
                          "Help create digital marketing materials and campaigns",
                          "Update website content and maintain online resources",
                          "Assist with email marketing and newsletter creation",
                          "Support online event promotion and registration systems",
                        ]}
                        qualifications={[
                          "Currently pursuing degree in Web Design, Marketing, Computer Science, or related field",
                          "Basic knowledge of HTML, CSS, and web design principles",
                          "Familiarity with content management systems",
                          "Understanding of digital marketing concepts",
                          "Strong attention to detail and creative problem-solving skills",
                        ]}
                      />

                      <JobListing
                        id="business-administration-intern"
                        title="Business Administration Intern"
                        location="Kings Park, NY (Hybrid)"
                        type="Internship"
                        expanded={expandedJob === "business-administration-intern"}
                        toggleExpanded={() => toggleJob("business-administration-intern")}
                        onApply={() => handleApply("Business Administration Intern")}
                        overview="Join Destination KP, the largest youth sports facility on Long Island, as a Business Administration Intern. You will assist senior management with administrative tasks, including vendor coordination, tracking construction progress, and supporting day-to-day business operations."
                        responsibilities={[
                          "Assist in maintaining project documentation and meeting notes",
                          "Coordinate with vendors and contractors for facility operations",
                          "Support management in scheduling, budgeting, and administrative tasks",
                          "Help organize reports and construction updates",
                        ]}
                        qualifications={[
                          "Pursuing a degree in Business Administration, Management, or related field",
                          "Strong organizational and communication skills",
                          "Proficiency in Microsoft Office (Excel, Word, PowerPoint)",
                        ]}
                      />

                      <JobListing
                        id="social-media-intern-destination-kp"
                        title="Social Media Intern (Destination KP)"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "social-media-intern-destination-kp"}
                        toggleExpanded={() => toggleJob("social-media-intern-destination-kp")}
                        onApply={() => handleApply("Social Media Intern (Destination KP)")}
                        overview="Help build and manage Destination KP's social media presence, promoting youth sports events, facility updates, and community engagement."
                        responsibilities={[
                          "Develop and schedule engaging content for social media platforms",
                          "Create graphics, videos, and promotional materials",
                          "Track analytics and engagement to optimize strategy",
                          "Coordinate with event staff to cover live events and announcements",
                        ]}
                        qualifications={[
                          "Experience with social media marketing (Instagram, TikTok, Facebook, Twitter, LinkedIn)",
                          "Knowledge of graphic design tools (Canva, Adobe, etc.)",
                          "Strong writing and creative skills",
                        ]}
                      />

                      <JobListing
                        id="social-media-intern-tech-esports"
                        title="Social Media Intern (Tech & eSports Focus)"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "social-media-intern-tech-esports"}
                        toggleExpanded={() => toggleJob("social-media-intern-tech-esports")}
                        onApply={() => handleApply("Social Media Intern (Tech & eSports Focus)")}
                        overview="Help develop the online presence for Battle Lounge (BL) and Destination KP's technology initiatives, including connected athlete programs, AI, and esports tournaments."
                        responsibilities={[
                          "Manage and grow social media channels for BL and sports tech initiatives",
                          "Create content related to gaming, esports, and tech-driven sports experiences",
                          "Engage with the online community and monitor trends",
                          "Collaborate with designers and video editors for social media campaigns",
                        ]}
                        qualifications={[
                          "Passion for gaming, esports, and emerging technology",
                          "Experience with social media and content creation",
                          "Strong writing and communication skills",
                        ]}
                      />

                      <JobListing
                        id="sports-broadcasting-intern"
                        title="Sports Broadcasting Intern"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "sports-broadcasting-intern"}
                        toggleExpanded={() => toggleJob("sports-broadcasting-intern")}
                        onApply={() => handleApply("Sports Broadcasting Intern")}
                        overview="Gain hands-on experience in sports broadcasting by covering youth sports events through HubT's Youth Sports Network (YSN) at Destination KP."
                        responsibilities={[
                          "Set up and manage live-streamed sports events",
                          "Operate broadcasting software and ensure high-quality streams",
                          "Provide play-by-play commentary or manage on-screen graphics",
                          "Coordinate with event staff to capture key moments",
                        ]}
                        qualifications={[
                          "Interest in sports broadcasting, journalism, or media production",
                          "Basic knowledge of streaming platforms and broadcasting software",
                          "Strong verbal communication and multitasking skills",
                        ]}
                      />

                      <JobListing
                        id="esports-strategy-event-intern"
                        title="eSports Strategy & Event Intern"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "esports-strategy-event-intern"}
                        toggleExpanded={() => toggleJob("esports-strategy-event-intern")}
                        onApply={() => handleApply("eSports Strategy & Event Intern")}
                        overview="Assist with launching Battle Lounge (BL) at KP, managing digital and in-person esports tournaments at Destination KP."
                        responsibilities={[
                          "Support tournament organization and logistics",
                          "Assist in developing marketing and engagement strategies",
                          "Coordinate with gaming communities and sponsors",
                          "Help manage digital and physical gaming spaces at KP",
                        ]}
                        qualifications={[
                          "Passion for esports and event organization",
                          "Strong coordination and analytical skills",
                          "Experience in gaming event planning is a plus",
                        ]}
                      />

                      <JobListing
                        id="sports-tech-data-science-intern"
                        title="Sports Tech & Data Science Intern"
                        location="Remote / Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "sports-tech-data-science-intern"}
                        toggleExpanded={() => toggleJob("sports-tech-data-science-intern")}
                        onApply={() => handleApply("Sports Tech & Data Science Intern")}
                        overview="Work on sports technology projects, developing AI models, predictive analytics, and database systems for Connected Athlete and other innovations at Destination KP."
                        responsibilities={[
                          "Build and optimize predictive models for athlete performance and injury prevention",
                          "Develop AI and data analytics solutions for sports applications",
                          "Assist in database management and tech integration",
                        ]}
                        qualifications={[
                          "Background in Computer Science, Data Science, AI, or related fields",
                          "Experience with Python, SQL, and AI/ML tools",
                          "Passion for sports technology and analytics",
                        ]}
                      />

                      <JobListing
                        id="sports-facility-event-operations-intern"
                        title="Sports Facility & Event Operations Intern"
                        location="Kings Park, NY"
                        type="Internship"
                        expanded={expandedJob === "sports-facility-event-operations-intern"}
                        toggleExpanded={() => toggleJob("sports-facility-event-operations-intern")}
                        onApply={() => handleApply("Sports Facility & Event Operations Intern")}
                        overview="Work directly with Destination KP's General Manager to plan and execute youth sports events, tournaments, and facility operations."
                        responsibilities={[
                          "Assist with scheduling and logistics for tournaments and special events",
                          "Coordinate with vendors, coaches, and facility staff",
                          "Help manage on-site operations, including field setup and event execution",
                          "Support community engagement and sponsorship activities",
                        ]}
                        qualifications={[
                          "Interest in sports management and event planning",
                          "Strong communication and organizational skills",
                          "Ability to work flexible hours, including weekends during events",
                        ]}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Application CTA */}
            <section className="mt-20">
              <div className="container mx-auto px-4 text-center">
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4">Ready to join our team?</h3>
                  <p className="text-gray-300 mb-6">
                    Apply today and be part of the future of youth sports and technology at Destination KP.
                  </p>
                  <button
                    onClick={() => handleApply("General Application")}
                    className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <Contact />

            {/* Newsletter Section */}
            <Newsletter />

            {/* News/Blogs Section */}
            <News />
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

interface JobListingProps {
  id: string
  title: string
  location: string
  type: string
  expanded: boolean
  toggleExpanded: () => void
  onApply: () => void
  overview: string
  responsibilities: string[]
  qualifications: string[]
}

function JobListing({
  id,
  title,
  location,
  type,
  expanded,
  toggleExpanded,
  onApply,
  overview,
  responsibilities,
  qualifications,
}: JobListingProps) {
  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onApply()
  }

  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-lg overflow-hidden h-fit ${expanded ? "md:col-span-2" : ""}`}
    >
      <div className="p-6 cursor-pointer flex justify-between items-center" onClick={toggleExpanded}>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{type}</span>
            </div>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-800">
          <div className="pt-6">
            <h4 className="text-lg font-medium mb-3">Overview</h4>
            <p className="text-gray-300 mb-6">{overview}</p>

            <h4 className="text-lg font-medium mb-3">Responsibilities</h4>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {responsibilities.map((item, index) => (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-medium mb-3">Qualifications</h4>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {qualifications.map((item, index) => (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                onClick={handleApplyClick}
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
              >
                Apply for this position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
