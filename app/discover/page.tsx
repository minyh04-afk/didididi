'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import ThemeCard from '@/components/ThemeCard';
import { themes, reviews } from '@/lib/mockData';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [onlyNoSpoiler, setOnlyNoSpoiler] = useState(false);

  // 필터링 로직
  let filteredThemes = themes;

  if (searchQuery) {
    filteredThemes = filteredThemes.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedRegion) {
    filteredThemes = filteredThemes.filter((t) => t.region.includes(selectedRegion));
  }

  if (selectedDifficulty) {
    filteredThemes = filteredThemes.filter((t) => t.difficulty === selectedDifficulty);
  }

  const regions = [...new Set(themes.map((t) => t.region.split(' ')[0]))];
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">🔍 탐색</h1>
          <button className="text-gray-600 hover:text-gray-900">⚙️</button>
        </div>

        {/* 검색 바 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="테마 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="space-y-4">
            {/* 지역 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지역
              </label>
              <select
                value={selectedRegion || ''}
                onChange={(e) => setSelectedRegion(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">전체</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* 난이도 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                난이도
              </label>
              <select
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">전체</option>
                <option value="easy">초급</option>
                <option value="medium">중급</option>
                <option value="hard">상급</option>
              </select>
            </div>

            {/* 스포일러 필터 */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
              <input
                type="checkbox"
                id="noSpoiler"
                checked={onlyNoSpoiler}
                onChange={(e) => setOnlyNoSpoiler(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="noSpoiler" className="text-sm font-medium text-gray-700">
                스포일러 없는 리뷰만 보기
              </label>
            </div>
          </div>
        </div>

        {/* 테마 목록 */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600 font-medium">
            총 {filteredThemes.length}개의 테마
          </div>
          {filteredThemes.length > 0 ? (
            filteredThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                reviews={reviews}
                showSpoilerFree={onlyNoSpoiler}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">해당하는 테마가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
