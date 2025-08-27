import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Briefcase, FileText, UserCheck, Clock } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "user_registered",
      user: "John Smith",
      action: "registered as job seeker",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "job_posted",
      user: "TechCorp Inc.",
      action: "posted Senior Developer position",
      time: "15 minutes ago",
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "application",
      user: "Sarah Johnson",
      action: "applied to Frontend Developer",
      time: "1 hour ago",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "user_approved",
      user: "Mike Wilson",
      action: "profile approved",
      time: "2 hours ago",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "job_updated",
      user: "StartupXYZ",
      action: "updated Full Stack Engineer job",
      time: "3 hours ago",
      icon: Briefcase,
      color: "text-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system activities and user actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
