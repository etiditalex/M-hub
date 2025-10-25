import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  DollarSign,
  FolderKanban,
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$428,000',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Active Projects',
      value: '24',
      change: '+3',
      isPositive: true,
      icon: FolderKanban,
      color: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Total Leads',
      value: '156',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: 'from-accent-500 to-accent-600',
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '-2.1%',
      isPositive: false,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const revenueData = [
    { month: 'Jan', revenue: 32000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 45000 },
    { month: 'May', revenue: 48000 },
    { month: 'Jun', revenue: 52000 },
  ]

  const projectsData = [
    { month: 'Jan', completed: 12, ongoing: 8 },
    { month: 'Feb', completed: 15, ongoing: 10 },
    { month: 'Mar', completed: 18, ongoing: 12 },
    { month: 'Apr', completed: 20, ongoing: 14 },
    { month: 'May', completed: 22, ongoing: 16 },
    { month: 'Jun', completed: 25, ongoing: 18 },
  ]

  const serviceDistribution = [
    { name: 'Digital Marketing', value: 35, color: '#38bdf8' },
    { name: 'Software Dev', value: 45, color: '#f59e0b' },
    { name: 'Networking', value: 20, color: '#8b5cf6' },
  ]

  const recentProjects = [
    {
      name: 'E-Commerce Platform',
      client: 'TechStore Inc.',
      status: 'In Progress',
      progress: 75,
    },
    {
      name: 'Marketing Campaign',
      client: 'GreenLife Co.',
      status: 'Completed',
      progress: 100,
    },
    {
      name: 'Cloud Migration',
      client: 'DataFlow Systems',
      status: 'In Progress',
      progress: 60,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`flex items-center space-x-1 text-sm font-medium ${
                        stat.isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.isPositive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
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
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Projects Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Projects Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectsData}>
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
                  <Bar dataKey="completed" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="ongoing" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Service Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Service Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {serviceDistribution.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-sm text-gray-400">{service.name}</span>
                    </div>
                    <span className="text-sm font-medium">{service.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Recent Projects</h3>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-gray-400">{project.client}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-primary-500/20 text-primary-400'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-dark-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard



