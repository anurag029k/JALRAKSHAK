import React from 'react'

const About = () => {
  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-12 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold">About JalRakshak</h1>
            <p className="mt-4 max-w-3xl text-slate-100 text-base sm:text-lg">
              JalRakshak is Delhi’s water body monitoring platform built to support sustainable management, protect aquatic
              ecosystems, and empower communities with real-time water quality insights.
            </p>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-12 space-y-10">
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Our mission</h2>
                <p className="mt-4 text-slate-600 leading-8">
                  We aim to make Delhi’s lakes, rivers, and reservoirs safer and healthier through continuous monitoring,
                  pollution tracking, and citizen-driven reporting. By combining sensor data with interactive maps, JalRakshak
                  helps administrators and citizens spot issues faster and take action.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-100 p-6">
                  <h3 className="font-semibold text-slate-900">Protect water quality</h3>
                  <p className="mt-2 text-slate-600">Track pollution levels, detect contamination, and protect Delhi’s blue infrastructure.</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-6">
                  <h3 className="font-semibold text-slate-900">Enable better decisions</h3>
                  <p className="mt-2 text-slate-600">Provide actionable insights to agencies, planners, and environmental stakeholders.</p>
                </div>
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-100 p-6">
                  <h3 className="font-semibold text-slate-900">Map-driven monitoring</h3>
                  <p className="mt-2 text-slate-600">Visualize water body status across the city with color-coded health indicators and real-time markers.</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-6">
                  <h3 className="font-semibold text-slate-900">Community reporting</h3>
                  <p className="mt-2 text-slate-600">Allow citizens to report pollution events and share observations with authorities.</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">What makes us different</h2>
                <p className="mt-4 text-slate-600 leading-8">
                  JalRakshak is designed around accessibility, transparency, and local engagement. It combines curated
                  environmental data with user-friendly dashboards so that every resident of Delhi can understand water
                  conditions and contribute to cleaner waterways.
                </p>
              </div>
            </section>

            <section className="rounded-3xl bg-blue-50 p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900">450+ water bodies</h3>
                  <p className="text-slate-600">Comprehensive coverage of Delhi’s lakes, ponds, rivers, and reservoirs.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900">Real-time analytics</h3>
                  <p className="text-slate-600">Live water quality metrics help stakeholders stay ahead of pollution events.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900">Community empowerment</h3>
                  <p className="text-slate-600">Empowering citizens to report issues, view data, and support cleaner water management.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
