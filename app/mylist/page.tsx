'use client';

import BottomNav from '@/components/BottomNav';
import { myExperiences, getResultLabel } from '@/lib/mockData';

export default function MyListPage() {
  const successCount = myExperiences.filter((e) => e.success).length;
  const successRate = ((successCount / myExperiences.length) * 100).toFixed(0);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">📋 나의 기록</h1>
        </div>

        {/* 통계 카드 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {myExperiences.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">총 경험</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{successRate}%</div>
              <div className="text-sm text-gray-600 mt-1">성공률</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{successCount}</div>
              <div className="text-sm text-gray-600 mt-1">성공</div>
            </div>
          </div>
        </div>

        {/* 경험 목록 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">다녀온 곳</h2>
          {myExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* 날짜 */}
              <div className="text-sm text-gray-500 mb-2">📅 {exp.date}</div>

              {/* 테마명 */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{exp.themeName}</h3>

              {/* 결과 및 시간 */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm font-medium">{getResultLabel(exp.success)}</span>
                <span className="text-sm text-gray-600">⏱️ {exp.duration}분</span>
              </div>

              {/* 평점 및 리뷰 */}
              {exp.rating && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-lg">{exp.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-700">{exp.review}</p>
                  {exp.hasSpoiler && (
                    <div className="mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        ⚠️ 스포일러 포함
                      </span>
                    </div>
                  )}
                  {!exp.hasSpoiler && (
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        ✓ 스포일러 없음
                      </span>
                    </div>
                  )}
                </div>
              )}

              {!exp.rating && (
                <div className="text-sm text-gray-500 py-2">
                  [리뷰 미작성]
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex gap-2">
                {!exp.rating && (
                  <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                    리뷰 작성하기
                  </button>
                )}
                <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
