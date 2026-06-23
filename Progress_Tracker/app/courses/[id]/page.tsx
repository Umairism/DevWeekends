'use client';

import { useRoadmap } from '@/utils/roadmapLoader';
import { notFound } from 'next/navigation';
import CourseView from './CourseView';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const roadmap = useRoadmap(id);
  
  if (!roadmap) {
    notFound();
  }

  return <CourseView roadmap={roadmap} />;
}
