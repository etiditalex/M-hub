import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Bell, Palette, Save, Moon, Sun } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [darkMode, setDarkMode] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@mhub.digital',
    phone: '+1 (555) 123-4567',
    company: 'M-Hub Digital',
    role: 'Administrator',
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-3xl font-bold">
                        AU
                      </div>
                      <div>
                        <Button variant="primary" size="sm">
                          Change Photo
                        </Button>
                        <p className="text-sm text-gray-400 mt-2">
                          JPG, PNG or GIF. Max size 2MB
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({ ...profileData, name: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({ ...profileData, email: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({ ...profileData, phone: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={profileData.company}
                          onChange={(e) =>
                            setProfileData({ ...profileData, company: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <select className="input-field" value={profileData.role}>
                        <option>Administrator</option>
                        <option>Manager</option>
                        <option>Developer</option>
                        <option>Marketing</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave} isLoading={isSaving}>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="input-field"
                      />
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave} isLoading={isSaving}>
                        Update Password
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Email Notifications',
                        desc: 'Receive email updates about your projects',
                      },
                      {
                        title: 'Push Notifications',
                        desc: 'Get push notifications on your devices',
                      },
                      {
                        title: 'Project Updates',
                        desc: 'Notifications about project status changes',
                      },
                      {
                        title: 'New Leads',
                        desc: 'Alert me when new leads are added',
                      },
                      {
                        title: 'Weekly Reports',
                        desc: 'Receive weekly performance reports',
                      },
                      {
                        title: 'System Alerts',
                        desc: 'Important system and security alerts',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={index < 4}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button onClick={handleSave} isLoading={isSaving}>
                      Save Preferences
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Theme</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setDarkMode(true)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            darkMode
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <Moon className="w-8 h-8 text-primary-400 mb-3" />
                          <p className="font-semibold">Dark Mode</p>
                          <p className="text-sm text-gray-400">
                            Easy on the eyes, perfect for night work
                          </p>
                        </button>
                        <button
                          onClick={() => setDarkMode(false)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            !darkMode
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <Sun className="w-8 h-8 text-accent-400 mb-3" />
                          <p className="font-semibold">Light Mode</p>
                          <p className="text-sm text-gray-400">
                            Clean and classic interface
                          </p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
                      <div className="flex space-x-4">
                        {[
                          { color: '#38bdf8', name: 'Cyan' },
                          { color: '#f59e0b', name: 'Amber' },
                          { color: '#8b5cf6', name: 'Purple' },
                          { color: '#10b981', name: 'Green' },
                          { color: '#ef4444', name: 'Red' },
                        ].map((item, index) => (
                          <button
                            key={index}
                            className="w-12 h-12 rounded-full border-2 border-white/20 hover:scale-110 transition-transform"
                            style={{ backgroundColor: item.color }}
                            title={item.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave} isLoading={isSaving}>
                        Apply Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardSettings



