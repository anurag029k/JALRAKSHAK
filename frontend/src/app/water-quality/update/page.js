"use client";

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import WaterQualityForm from '@/components/WaterQualityForm/page';

export default function WaterQualityUpdatePage() {
  const { user, hasRole } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!user || !hasRole(['admin', 'officer'])) {
      router.push('/dashboard');
    }
  }, [user, hasRole, router]);

  if (!user || !hasRole(['admin', 'officer'])) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <WaterQualityForm />
    </div>
  );
}
