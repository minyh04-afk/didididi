'use client';

import Link from 'next/link';
import { use } from 'react';
import { themes, reviews, calculateTrustScore, getDifficultyLabel, currentUser } from '@/lib/mockData';
import BottomNav from '@/components/BottomNav';

interface ThemeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ThemeDetailPage({ params }: ThemeDetailPageProps) {
  const { id } = use(params);
  const theme = themes.find((t) => t.id === id);
  const themeReviews = reviews.filter((r) => r.themeId === id);

  if (!theme) {
    return (
      <main className="min-h-screen bg-gray-50 pb-24">
        <div className="max-w-2xl mx-auto p-4">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">테마를 찾을 수 없습니다.</p>
            <Link href="/discover" className="text-blue-600 hover:underline mt-4 inline-block">
              ← 돌아가기
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const avgRating = themeReviews.length > 0
    ? (themeReviews.reduce((sum, r) => sum + r.rating, 0) / themeReviews.length).toFixed(1)
    : '데이터 없음';

  // 스포일러 필터링
  const noSpoilerReviews = themeReviews.filter((r) => !r.hasSpoiler);
  const spoilerReviews = themeReviews.filter((r) => r.hasSpoiler);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <Link href="/discover" className="text-gray-600 hover:text-gray-900 text-lg">
            ◀
          </Link>
          <h1 className="text-xl font-bold text-gray-900 flex-1 text-center">{theme.name}</h1>
          <button className="text-gray-600 hover:text-gray-900">❤️</button>
        </div>

        {/* 테마 이미지 & 기본정보 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-6 text-center">
          <div className="text-8xl mb-4">{theme.image}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{theme.name}</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="text-2xl font-bold">{avgRating}</span>
            <span className="text-gray-600 text-sm">({themeReviews.length}개 리뷰)</span>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500 font-medium">난이도</span>
              <p className="text-lg font-bold text-gray-900">{getDifficultyLabel(theme.difficulty)}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium">인원</span>
              <p className="text-lg font-bold text-gray-900">{theme.minPeople}~{theme.maxPeople}명</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium">소요시간</span>
              <p className="text-lg font-bold text-gray-900">{theme.duration}분</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium">가격</span>
              <p className="text-lg font-bold text-gray-900">{theme.price.toLocaleString()}원</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-500 font-medium">위치</span>
            <p className="text-gray-900 font-medium">{theme.region}</p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="py-3 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            예약하기
          </button>
          <button className="py-3 px-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">
            팀 매칭
          </button>
        </div>

        {/* 리뷰 섹션 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">리뷰</h3>

          {/* 리뷰 필터 */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all-reviews"
                name="review-filter"
                defaultChecked
                className="w-4 h-4"
              />
              <label htmlFor="all-reviews" className="text-sm font-medium text-gray-700">
                전체 ({themeReviews.length}개)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="no-spoiler"
                name="review-filter"
                className="w-4 h-4"
              />
              <label htmlFor="no-spoiler" className="text-sm font-medium text-gray-700">
                스포일러 없음 ({noSpoilerReviews.length}개)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="with-spoiler"
                name="review-filter"
                className="w-4 h-4"
              />
              <label htmlFor="with-spoiler" className="text-sm font-medium text-gray-700">
                스포일러 있음 ({spoilerReviews.length}개)
              </label>
            </div>
          </div>

          {/* 리뷰 목록 */}
          <div className="space-y-4">
            {themeReviews.length > 0 ? (
              themeReviews.map((review) => {
                const reviewAuthor = {
                  id: review.userId,
                  name: review.userName,
                  gender: 'F' as const,
                  experience: Math.floor(Math.random() * 40) + 10,
                  followers: Math.floor(Math.random() * 50) + 5,
                  region: '강남',
                };
                const trustScore = calculateTrustScore(review, reviewAuthor);

                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {/* 리뷰 헤더 */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">
                          {review.userName} {reviewAuthor.gender === 'F' ? '♀' : '♂'}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          경험: {reviewAuthor.experience}회 | 팔로워: {reviewAuthor.followers}명
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-bold text-lg">{review.rating}</span>
                        </div>
                        <span className="text-xs font-bold text-blue-600">
                          신뢰도: {trustScore}
                        </span>
                      </div>
                    </div>

                    {/* 스포일러 배지 */}
                    <div className="mb-3">
                      {review.hasSpoiler ? (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          ⚠️ 스포일러 포함
                        </span>
                      ) : (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          ✓ 스포일러 없음
                        </span>
                      )}
                    </div>

                    {/* 리뷰 본문 */}
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      "{review.content}"
                    </p>

                    {/* 리뷰 액션 */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                        👍 {review.likes}
                      </button>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        팀 매칭 신청
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">아직 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
