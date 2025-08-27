"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { JobCard } from "@/components/job-card"
import { RefreshCw, Zap, Target, TrendingUp, Clock } from "lucide-react"

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  matchScore: number
  postedDate: string
  skills: string[]
  type: string
  description: string
  isBoosted?: boolean
}

interface RecommendationData {
  recommendations: Job[]
  userProfile: {
    skills: string[]
    location: string
    experienceLevel: string
  }
}

export function RecommendationEngine() {
  const [recommendations, setRecommendations] = useState<Job[]>([])
  const [userProfile, setUserProfile] = useState<RecommendationData["userProfile"] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/recommendations?userId=1&limit=6")
      const data: { success: boolean; recommendations: Job[]; userProfile: RecommendationData["userProfile"] } =
        await response.json()

      if (data.success) {
        setRecommendations(data.recommendations)
        setUserProfile(data.userProfile)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshRecommendations = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/recommendations/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, preferences: userProfile }),
      })

      if (response.ok) {
        await fetchRecommendations()
      }
    } catch (error) {
      console.error("Error refreshing recommendations:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchRecommendations, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Recommendations...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const averageMatchScore =
    recommendations.length > 0
      ? Math.round(recommendations.reduce((sum, job) => sum + job.matchScore, 0) / recommendations.length)
      : 0

  const boostedJobs = recommendations.filter((job) => job.isBoosted).length

  return (
    <div className="space-y-6">
      {/* Recommendation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Match Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{averageMatchScore}%</div>
            <p className="text-xs text-muted-foreground">Average match quality</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Matches</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{recommendations.length}</div>
            <p className="text-xs text-muted-foreground">Personalized for you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Boosted Matches</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{boostedJobs}</div>
            <p className="text-xs text-muted-foreground">Location/experience boost</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">
              {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <p className="text-xs text-muted-foreground">Real-time updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span>AI-Powered Job Recommendations</span>
              </CardTitle>
              <CardDescription>
                Personalized matches based on your skills: {userProfile?.skills.join(", ")} | Location:{" "}
                {userProfile?.location} | Level: {userProfile?.experienceLevel}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={refreshRecommendations} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((job) => (
              <div key={job.id} className="relative">
                {job.isBoosted && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Boosted
                    </Badge>
                  </div>
                )}
                <JobCard
                  job={job}
                  onSave={(jobId) => console.log("Save job:", jobId)}
                  onApply={(jobId) => console.log("Apply to job:", jobId)}
                />
              </div>
            ))}
          </div>

          {recommendations.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No recommendations available</h3>
              <p className="text-muted-foreground mb-4">
                Complete your profile to get personalized job recommendations
              </p>
              <Button>Complete Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendation Insights */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendation Insights</CardTitle>
            <CardDescription>How we calculate your job matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Match Factors</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skills Alignment</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm font-medium">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Location Match</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={75} className="w-20 h-2" />
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Experience Level</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={90} className="w-20 h-2" />
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Job Type Preference</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={70} className="w-20 h-2" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Salary Expectations</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={80} className="w-20 h-2" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Boost Factors</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Same location: +5% match score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Experience level match: Priority ranking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Recently posted jobs: Higher visibility</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>Skills overlap: Weighted by demand</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
