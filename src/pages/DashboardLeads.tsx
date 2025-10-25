import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Mail, Phone, TrendingUp } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'
import leadsData from '../data/leads.json'

const DashboardLeads = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredLeads = leadsData.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || lead.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Warm':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'Cold':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const statusStats = {
    Hot: leadsData.filter((l) => l.status === 'Hot').length,
    Warm: leadsData.filter((l) => l.status === 'Warm').length,
    Cold: leadsData.filter((l) => l.status === 'Cold').length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Leads Management</h1>
          <p className="text-gray-400">Track and manage your sales pipeline</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Hot Leads</p>
                  <p className="text-3xl font-bold text-red-400">{statusStats.Hot}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Warm Leads</p>
                  <p className="text-3xl font-bold text-amber-400">{statusStats.Warm}</p>
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Cold Leads</p>
                  <p className="text-3xl font-bold text-blue-400">{statusStats.Cold}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
              >
                <option value="All">All Status</option>
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">
                    Company
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">
                    Service
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">
                    Value
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-gray-400">{lead.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{lead.company}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                        {lead.service}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">
                      ${lead.value.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      {new Date(lead.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <a
                          href={`mailto:${lead.email}`}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4 text-gray-400" />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Call"
                        >
                          <Phone className="w-4 h-4 text-gray-400" />
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No leads found matching your criteria.</p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default DashboardLeads



