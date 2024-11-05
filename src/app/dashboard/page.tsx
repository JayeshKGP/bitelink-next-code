"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LogOut, 
  Settings, 
  User, 
  Plus,
  Link as LinkIcon,
  BarChart3,
  Users,
  Globe,
  Copy,
  Pencil,
  Trash2,
  ExternalLink
} from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Mock data
const dailyClicks = [
  { date: "Mon", clicks: 120 },
  { date: "Tue", clicks: 150 },
  { date: "Wed", clicks: 180 },
  { date: "Thu", clicks: 190 },
  { date: "Fri", clicks: 160 },
  { date: "Sat", clicks: 140 },
  { date: "Sun", clicks: 130 },
]
//test
const monthlyClicks = [
  { name: "Jan", clicks: 1200 },
  { name: "Feb", clicks: 1900 },
  { name: "Mar", clicks: 2100 },
  { name: "Apr", clicks: 2400 },
  { name: "May", clicks: 2300 },
  { name: "Jun", clicks: 2800 },
  { name: "Jul", clicks: 2900 },
  { name: "Aug", clicks: 3100 },
  { name: "Sep", clicks: 3400 },
  { name: "Oct", clicks: 3600 },
  { name: "Nov", clicks: 3800 },
  { name: "Dec", clicks: 4100 },
]

const locationData = [
  { name: "United States", value: 45 },
  { name: "United Kingdom", value: 25 },
  { name: "Germany", value: 15 },
  { name: "Others", value: 15 },
]

const links = [
  {
    id: 1,
    originalUrl: "https://example.com/very/long/url/that/needs/shortening",
    shortUrl: "bitelink.com/abc123",
    clicks: 1234,
    todayClicks: 123,
    monthClicks: 4567,
  },
  {
    id: 2,
    originalUrl: "https://another-example.com/path/to/page",
    shortUrl: "bitelink.com/def456",
    clicks: 567,
    todayClicks: 45,
    monthClicks: 2345,
  },
]

export default function DashboardPage() {
  const [selectedLink, setSelectedLink] = React.useState(links[0])
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const chartColors = {
    primary: 'rgba(53, 162, 235, 0.8)',
    primaryLight: 'rgba(53, 162, 235, 0.4)',
    secondary: 'rgba(75, 192, 192, 0.8)',
    secondaryLight: 'rgba(75, 192, 192, 0.4)',
    accent: 'rgba(255, 99, 132, 0.8)',
    accentLight: 'rgba(255, 99, 132, 0.4)',
    muted: 'rgba(201, 203, 207, 0.8)',
  }

  const dailyChartData = {
    labels: dailyClicks.map(item => item.date),
    datasets: [
      {
        label: 'Daily Clicks',
        data: dailyClicks.map(item => item.clicks),
        backgroundColor: chartColors.primaryLight,
        borderColor: chartColors.primary,
        borderWidth: 2,
      },
    ],
  }

  const monthlyChartData = {
    labels: monthlyClicks.map(item => item.name),
    datasets: [
      {
        label: 'Monthly Clicks',
        data: monthlyClicks.map(item => item.clicks),
        backgroundColor: chartColors.secondaryLight,
        borderColor: chartColors.secondary,
        borderWidth: 2,
      },
    ],
  }

  const locationChartData = {
    labels: locationData.map(item => item.name),
    datasets: [
      {
        data: locationData.map(item => item.value),
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.accent,
          chartColors.muted,
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <LinkIcon className="h-6 w-6" />
            <span className="text-lg font-bold">BiteLink</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" />
              Create New Link
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  {user?.name || 'Profile'}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Link to Analyze</CardTitle>
              <CardDescription>Choose a shortened link to view its detailed analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedLink.id.toString()}
                onValueChange={(value) => 
                  setSelectedLink(links.find(link => link.id.toString() === value) || links[0])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a link" />
                </SelectTrigger>
                <SelectContent>
                  {links.map((link) => (
                    <SelectItem key={link.id} value={link.id.toString()}>
                      {link.shortUrl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedLink.clicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Clicks</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedLink.todayClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +10.5% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Clicks</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedLink.monthClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12.3% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Last 7 Days</CardTitle>
                <CardDescription>Daily click statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Bar options={chartOptions} data={dailyChartData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Clicks by location</CardDescription>
              </CardHeader>
              <CardContent>
                <Pie data={locationChartData} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Yearly Overview</CardTitle>
              <CardDescription>Monthly click trends for the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar options={chartOptions} data={monthlyChartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Links</CardTitle>
              <CardDescription>Manage all your shortened URLs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Original URL</TableHead>
                      <TableHead>Short URL</TableHead>
                      <TableHead>Total Clicks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {links.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className="font-medium max-w-[300px] truncate">
                          {link.originalUrl}
                        </TableCell>
                        <TableCell>{link.shortUrl}</TableCell>
                        
                        <TableCell>{link.clicks.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}