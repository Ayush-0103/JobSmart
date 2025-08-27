"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookmarkPlus, Building2, MapPin, DollarSign, Clock } from "lucide-react"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    salary: string
    matchScore: number
    postedDate: string
    skills: string[]
    type: string
    description?: string
  }
  onSave?: (jobId: number) => void
  onApply?: (jobId: number) => void
}

export function JobCard({ job, onSave, onApply }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{job.matchScore}%</div>
            <div className="text-xs text-muted-foreground">Match</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={job.matchScore} className="h-2" />
          {job.description && <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              <Badge variant="outline" className="text-xs">
                {job.type}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => onSave?.(job.id)}>
                <BookmarkPlus className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" onClick={() => onApply?.(job.id)}>
                Apply Now
              </Button>
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Posted {job.postedDate}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
