'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })
const HeatMap = dynamic(() => import('@/components/HeatMap/page'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      <section className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">Delhi Water Bodies Real-Time Monitoring System</h1>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Ensuring the health, protection, and sustainable management of Delhi's blue infrastructure through real-time monitoring, mapping and community reporting.</p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/geomap" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:brightness-95">Water Bodies Geo Map</Link>
              <Link href="/about" className="px-6 py-3 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="rounded-lg shadow-lg bg-white overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Water Bodies Geo Map</h3>
            </div>
            <div className="p-6">
              <div className="w-full h-96 bg-gray-100 rounded-md flex items-center justify-center">
                {/* <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=000" alt="map preview" width={1200} height={720} className="object-cover w-full h-full" /> */}
                {/* <iframe src="https://www.google.com/maps/d/embed?mid=1BjMwuPVlftwaPaop5GfE_hJPU_d1oaYv&ehbc=2E312F" className="w-full h-full"></iframe> */}
                {/* <Map waterBodies={[]} onWaterBodyClick={() => {}} getStatusColor={() => 'blue'} /> */}
                <HeatMap/>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold">Real-Time Data</h4>
              <p className="mt-2 text-sm text-slate-600">Sensor feeds and continuous readings for water quality parameters.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold">Map Visualization</h4>
              <p className="mt-2 text-sm text-slate-600">Interactive map with status markers and historical trends.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold">Community Reporting</h4>
              <p className="mt-2 text-sm text-slate-600">Report pollution or issues and contribute to monitoring efforts.</p>
            </div>
          </div>
        </div>

        <aside>
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="font-semibold text-lg">Key Features</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Real-Time Data from sensors</li>
              <li>Map Visualization & Status</li>
              <li>Pollution Tracking & Alerts</li>
              <li>Community Reporting</li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium">Delhi Water Bodies</h5>
              <div className="mt-3 grid grid-cols-1 gap-3">
                <div className="rounded overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=000" alt="waterbody" width={600} height={360} className="object-cover w-full h-32 rounded" />
                </div>
                <div className="text-sm text-slate-600">Total Water Bodies: 450+</div>
                <div className="text-sm text-slate-600">Monitored: 320+</div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="font-semibold text-xl">Get Involved</h3>
          <p className="mt-2 text-slate-600">Join the community to help protect and monitor Delhi's water bodies. Report issues, view data, and collaborate.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/login" className="px-5 py-2 bg-blue-600 text-white rounded-md">Login</Link>
            <Link href="/register" className="px-5 py-2 border border-slate-300 rounded-md">Register</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
