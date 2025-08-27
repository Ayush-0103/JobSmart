import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminStats } from "@/components/admin-stats"
import { RecentActivity } from "@/components/recent-activity"
import { AnalyticsChart } from "@/components/analytics-chart"
import { Briefcase, Plus, Eye, Edit, Trash2 } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for recent jobs
  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      status: "active",
      applications: 24,
      postedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      status: "active",
      applications: 18,
      postedDate: "2024-01-14",
    },
    {
      id: 3,
      title: "React Developer",
      company: "Digital Agency",
      status: "paused",
      applications: 12,
      postedDate: "2024-01-12",
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Enterprise Corp",
      status: "active",
      applications: 31,
      postedDate: "2024-01-10",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage jobs, users, and monitor system performance</p>
          </div>

          {/* Stats Overview */}
          <AdminStats />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Analytics Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                  <CardDescription>Job applications over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Recent Jobs Management */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Job Postings</CardTitle>
                  <CardDescription>Manage and monitor your latest job listings</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{job.applications} applications</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
