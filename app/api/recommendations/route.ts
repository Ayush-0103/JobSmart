import { type NextRequest, NextResponse } from "next/server"

// Mock user profile data - in a real app, this would come from the database
const mockUserProfile = {
  id: 1,
  skills: ["React", "TypeScript", "JavaScript", "Node.js", "CSS"],
  location: "San Francisco, CA",
  experienceLevel: "Senior",
  preferredSalaryMin: 100000,
  preferredJobTypes: ["Full-time", "Remote"],
  appliedJobs: [1, 3], // IDs of jobs already applied to
}

// Mock job data - in a real app, this would come from the database
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    salaryMin: 120000,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    type: "Full-time",
    experienceLevel: "Senior",
    postedDate: "2024-01-15",
    description: "Join our innovative team building cutting-edge web applications.",
    companyType: "Tech Startup",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $130k",
    salaryMin: 100000,
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    type: "Full-time",
    experienceLevel: "Mid-level",
    postedDate: "2024-01-14",
    description: "Build scalable applications in a fast-paced startup environment.",
    companyType: "Tech Startup",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Digital Agency",
    location: "New York, NY",
    salary: "$90k - $110k",
    salaryMin: 90000,
    skills: ["React", "JavaScript", "CSS", "Figma"],
    type: "Contract",
    experienceLevel: "Mid-level",
    postedDate: "2024-01-12",
    description: "Create beautiful, responsive web applications for diverse clients.",
    companyType: "Agency",
  },
  {
    id: 4,
    title: "Senior React Engineer",
    company: "InnovateTech",
    location: "San Francisco, CA",
    salary: "$130k - $160k",
    salaryMin: 130000,
    skills: ["React", "TypeScript", "GraphQL", "AWS"],
    type: "Full-time",
    experienceLevel: "Senior",
    postedDate: "2024-01-16",
    description: "Lead frontend development for our next-generation platform.",
    companyType: "Tech Company",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    salary: "$85k - $105k",
    salaryMin: 85000,
    skills: ["React", "JavaScript", "CSS", "HTML"],
    type: "Full-time",
    experienceLevel: "Junior",
    postedDate: "2024-01-13",
    description: "Join our team creating modern web experiences.",
    companyType: "Agency",
  },
]

function calculateMatchScore(userProfile: typeof mockUserProfile, job: (typeof mockJobs)[0]): number {
  let score = 0
  let maxScore = 0

  // Skills matching (40% weight)
  const skillsWeight = 40
  const userSkills = userProfile.skills.map((s) => s.toLowerCase())
  const jobSkills = job.skills.map((s) => s.toLowerCase())
  const matchingSkills = userSkills.filter((skill) => jobSkills.includes(skill))
  const skillsScore = (matchingSkills.length / Math.max(jobSkills.length, 1)) * skillsWeight
  score += skillsScore
  maxScore += skillsWeight

  // Location matching (20% weight)
  const locationWeight = 20
  const locationBonus = userProfile.location === job.location || job.location === "Remote" ? locationWeight : 0
  score += locationBonus
  maxScore += locationWeight

  // Experience level matching (20% weight)
  const experienceWeight = 20
  const experienceMatch =
    userProfile.experienceLevel === job.experienceLevel
      ? experienceWeight
      : userProfile.experienceLevel === "Senior" && job.experienceLevel === "Mid-level"
        ? experienceWeight * 0.8
        : userProfile.experienceLevel === "Mid-level" && job.experienceLevel === "Senior"
          ? experienceWeight * 0.6
          : 0
  score += experienceMatch
  maxScore += experienceWeight

  // Job type preference (10% weight)
  const jobTypeWeight = 10
  const jobTypeMatch = userProfile.preferredJobTypes.includes(job.type) ? jobTypeWeight : 0
  score += jobTypeMatch
  maxScore += jobTypeWeight

  // Salary matching (10% weight)
  const salaryWeight = 10
  const salaryMatch = job.salaryMin >= userProfile.preferredSalaryMin ? salaryWeight : salaryWeight * 0.5
  score += salaryMatch
  maxScore += salaryWeight

  // Calculate final percentage
  const matchPercentage = Math.round((score / maxScore) * 100)

  // Apply location boost for same location
  const locationBoost = userProfile.location === job.location ? 5 : 0

  return Math.min(matchPercentage + locationBoost, 100)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "1"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Calculate match scores for all jobs
    const jobsWithScores = mockJobs
      .filter((job) => !mockUserProfile.appliedJobs.includes(job.id)) // Exclude applied jobs
      .map((job) => ({
        ...job,
        matchScore: calculateMatchScore(mockUserProfile, job),
        isBoosted: mockUserProfile.location === job.location || mockUserProfile.experienceLevel === job.experienceLevel,
      }))
      .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      recommendations: jobsWithScores,
      userProfile: {
        skills: mockUserProfile.skills,
        location: mockUserProfile.location,
        experienceLevel: mockUserProfile.experienceLevel,
      },
    })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ success: false, error: "Failed to generate recommendations" }, { status: 500 })
  }
}
