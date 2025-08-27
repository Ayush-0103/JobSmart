"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { JobCard } from "@/components/job-card"
import { Search, MapPin, Briefcase, Clock, Building2, SlidersHorizontal, X } from "lucide-react"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(true)
  const [salaryRange, setSalaryRange] = useState([50000])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")
  const [selectedCompanyType, setSelectedCompanyType] = useState("")

  // Mock job data
  const allJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      matchScore: 95,
      postedDate: "2 days ago",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      type: "Full-time",
      experience: "Senior",
      companyType: "Tech Startup",
      description: "Join our innovative team building cutting-edge web applications with modern technologies.",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $130k",
      matchScore: 88,
      postedDate: "1 day ago",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      type: "Full-time",
      experience: "Mid-level",
      companyType: "Tech Startup",
      description: "Build scalable applications from frontend to backend in a fast-paced startup environment.",
    },
    {
      id: 3,
      title: "React Developer",
      company: "Digital Agency",
      location: "New York, NY",
      salary: "$90k - $110k",
      matchScore: 82,
      postedDate: "3 days ago",
      skills: ["React", "JavaScript", "CSS", "Figma"],
      type: "Contract",
      experience: "Mid-level",
      companyType: "Agency",
      description: "Create beautiful, responsive web applications for diverse clients in various industries.",
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Enterprise Corp",
      location: "Austin, TX",
      salary: "$110k - $140k",
      matchScore: 78,
      postedDate: "1 week ago",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      type: "Full-time",
      experience: "Senior",
      companyType: "Enterprise",
      description: "Design and implement robust backend systems for enterprise-level applications.",
    },
    {
      id: 5,
      title: "UI/UX Developer",
      company: "Design Studio",
      location: "Los Angeles, CA",
      salary: "$85k - $105k",
      matchScore: 75,
      postedDate: "4 days ago",
      skills: ["React", "CSS", "Figma", "Adobe XD"],
      type: "Full-time",
      experience: "Junior",
      companyType: "Design Agency",
      description: "Bridge the gap between design and development, creating pixel-perfect user interfaces.",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      salary: "$130k - $160k",
      matchScore: 70,
      postedDate: "5 days ago",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      type: "Full-time",
      experience: "Senior",
      companyType: "Tech Company",
      description: "Manage cloud infrastructure and deployment pipelines for high-traffic applications.",
    },
  ]

  const availableSkills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "Next.js",
    "Tailwind CSS",
    "Figma",
    "CSS",
    "HTML",
    "GraphQL",
    "Kubernetes",
  ]

  const locations = ["Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Los Angeles, CA", "Seattle, WA"]

  const experienceLevels = ["Entry-level", "Junior", "Mid-level", "Senior", "Lead", "Executive"]

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]

  const companyTypes = ["Tech Startup", "Enterprise", "Agency", "Design Agency", "Tech Company", "Non-profit"]

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSkills([])
    setSelectedLocation("")
    setSelectedExperience("")
    setSelectedJobType("")
    setSelectedCompanyType("")
    setSalaryRange([50000])
  }

  // Filter jobs based on current filters
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => job.skills.includes(skill))

    const matchesLocation = !selectedLocation || job.location === selectedLocation
    const matchesExperience = !selectedExperience || job.experience === selectedExperience
    const matchesJobType = !selectedJobType || job.type === selectedJobType
    const matchesCompanyType = !selectedCompanyType || job.companyType === selectedCompanyType

    return (
      matchesSearch && matchesSkills && matchesLocation && matchesExperience && matchesJobType && matchesCompanyType
    )
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Job Search</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-transparent"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filters</CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Jobs</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Job title, company, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Job Type */}
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Company Type */}
                  <div className="space-y-2">
                    <Label>Company Type</Label>
                    <Select value={selectedCompanyType} onValueChange={setSelectedCompanyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Company Types</SelectItem>
                        {companyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Salary Range */}
                  <div className="space-y-2">
                    <Label>Minimum Salary</Label>
                    <div className="px-2">
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={200000}
                        min={30000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$30k</span>
                        <span className="font-medium">${(salaryRange[0] / 1000).toFixed(0)}k+</span>
                        <span>$200k</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {availableSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm font-normal">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Job Results */}
          <div className="flex-1 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{filteredJobs.length} Jobs Found</h2>
                <p className="text-muted-foreground">
                  {searchQuery && `Results for "${searchQuery}"`}
                  {selectedSkills.length > 0 && <span className="ml-2">• Skills: {selectedSkills.join(", ")}</span>}
                </p>
              </div>
              <Select defaultValue="match">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                  <SelectItem value="company">Company A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(selectedSkills.length > 0 ||
              selectedLocation ||
              selectedExperience ||
              selectedJobType ||
              selectedCompanyType) && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedLocation && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedLocation("")}>
                    <MapPin className="w-3 h-3 mr-1" />
                    {selectedLocation}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {selectedExperience && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedExperience("")}>
                    <Briefcase className="w-3 h-3 mr-1" />
                    {selectedExperience}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {selectedJobType && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedJobType("")}>
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedJobType}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {selectedCompanyType && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCompanyType("")}>
                    <Building2 className="w-3 h-3 mr-1" />
                    {selectedCompanyType}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
              </div>
            )}

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSave={(jobId) => console.log("Save job:", jobId)}
                    onApply={(jobId) => console.log("Apply to job:", jobId)}
                  />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">No jobs found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your filters or search terms to find more opportunities.
                        </p>
                      </div>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Load More */}
            {filteredJobs.length > 0 && (
              <div className="text-center pt-8">
                <Button variant="outline" size="lg">
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
