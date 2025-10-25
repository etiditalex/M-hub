import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'

const DashboardAnalytics = () => {
  const metrics = [
    {
      title: 'Total Impressions',
      value: '2.4M',
      change: '+18.2%',
      isPositive: true,
      icon: Eye,
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: '+2.4%',
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: 'Active Users',
      value: '48.2K',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
    },
    {
      title: 'Revenue/User',
      value: '$142',
      change: '-3.2%',
      isPositive: false,
      icon: DollarSign,
    },
  ]

  const trafficData = [
    { month: 'Jan', organic: 4000, paid: 2400, social: 1800 },
    { month: 'Feb', organic: 4500, paid: 2600, social: 2000 },
    { month: 'Mar', organic: 5000, paid: 2800, social: 2200 },
    { month: 'Apr', organic: 5500, paid: 3000, social: 2400 },
    { month: 'May', organic: 6000, paid: 3200, social: 2600 },
    { month: 'Jun', organic: 6500, paid: 3400, social: 2800 },
  ]

  const performanceData = [
    { month: 'Jan', revenue: 32000, cost: 18000 },
    { month: 'Feb', revenue: 38000, cost: 20000 },
    { month: 'Mar', revenue: 42000, cost: 22000 },
    { month: 'Apr', revenue: 45000, cost: 23000 },
    { month: 'May', revenue: 48000, cost: 24000 },
    { month: 'Jun', revenue: 52000, cost: 25000 },
  ]

  const servicePerformance = [
    { service: 'SEO', score: 85 },
    { service: 'Social Media', score: 78 },
    { service: 'Content', score: 92 },
    { service: 'PPC', score: 75 },
    { service: 'Email', score: 88 },
  ]

  const deviceData = [
    { device: 'Desktop', sessions: 45000 },
    { device: 'Mobile', sessions: 38000 },
    { device: 'Tablet', sessions: 12000 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Comprehensive performance insights and metrics</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`flex items-center space-x-1 text-sm font-medium ${
                        metric.isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {metric.isPositive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <h3 className="text-xl font-bold mb-6">Traffic Sources</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="organic"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOrganic)"
                />
                <Area
                  type="monotone"
                  dataKey="paid"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPaid)"
                />
                <Area
                  type="monotone"
                  dataKey="social"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSocial)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Performance & Service Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Revenue vs Cost</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ fill: '#38bdf8', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Service Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={servicePerformance}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="service" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#94a3b8" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#38bdf8"
                    fill="#38bdf8"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <h3 className="text-xl font-bold mb-6">Sessions by Device</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="device" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="sessions"
                  fill="#38bdf8"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={100}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardAnalytics



