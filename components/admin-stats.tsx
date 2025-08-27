import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, TrendingUp, UserCheck, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Jobs",
      value: "156",
      change: "+12%",
      changeType: "positive",
      icon: Briefcase,
      description: "Active job postings",
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      description: "Registered job seekers",
    },
    {
      title: "Applications",
      value: "1,234",
      change: "+23%",
      changeType: "positive",
      icon: UserCheck,
      description: "This month",
    },
    {
      title: "Match Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: TrendingUp,
      description: "AI matching accuracy",
    },
  ]

  const applicationStats = [
    { label: "Pending", value: 45, color: "text-yellow-600", icon: Clock },
    { label: "Approved", value: 128, color: "text-green-600", icon: CheckCircle },
    { label: "Rejected", value: 23, color: "text-red-600", icon: XCircle },
    { label: "Under Review", value: 67, color: "text-blue-600", icon: AlertTriangle },
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="secondary"
                  className={stat.changeType === "positive" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}
                >
                  {stat.change}
                </Badge>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {applicationStats.map((stat) => (
              <div key={stat.label} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
