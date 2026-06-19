'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';

interface TeamMate {
  id: string;
  name: string;
  gender: 'M' | 'F';
  experience: number;
  followers: number;
  preference: string;
  trustScore: number;
}

const mockTeamMates: TeamMate[] = [
  {
    id: 'tm_001',
    name: '준영이',
    gender: 'M',
    experience: 30,
    followers: 15,
    preference: '무관심',
    trustScore: 4.2,
  },
  {
    id: 'tm_002',
    name: '최민서',
    gender: 'F',
    experience: 25,
    followers: 38,
    preference: '공포',
    trustScore: 4.5,
  },
  {
    id: 'tm_003',
    name: '박준호',
    gender: 'M',
    experience: 40,
    followers: 52,
    preference: '미스터리',
    trustScore: 4.3,
  },
];

export default function TeamPage() {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleMatchClick = () => {
    setIsMatching(true);
    // 1초 후 매칭 완료
    setTimeout(() => {
      setIsMatching(false);
      setShowResults(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">👥 팀 매칭</h1>
        </div>

        {/* 내 스케줄 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">내 스케줄</h2>

          {!showScheduleForm ? (
            <button
              onClick={() => setShowScheduleForm(true)}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              + 스케줄 추가하기
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  날짜
                </label>
                <input
                  type="date"
                  defaultValue="2026-06-21"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    시간
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>오전 10시</option>
                    <option>오후 2시</option>
                    <option>오후 6시</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    인원
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>2명</option>
                    <option>3명</option>
                    <option>4명</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  지역
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>강남</option>
                  <option>강북</option>
                  <option>강서</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  난이도
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">선택 안함</option>
                  <option value="easy">초급</option>
                  <option value="medium">중급</option>
                  <option value="hard">상급</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleMatchClick}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  매칭 시작
                </button>
                <button
                  onClick={() => {
                    setShowScheduleForm(false);
                    setShowResults(false);
                  }}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {/* 매칭 중 상태 */}
          {isMatching && (
            <div className="mt-4 py-8 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-gray-600 font-medium">매칭 중...</p>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          )}

          {/* 매칭 완료 */}
          {showResults && (
            <div className="mt-4 py-4 px-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-center font-bold text-green-700 text-lg">🎉 매칭 완료!</p>
              <p className="text-center text-sm text-green-600 mt-1">
                {mockTeamMates.length}명의 팀원 제안을 받았습니다
              </p>
            </div>
          )}
        </div>

        {/* 매칭된 팀원 */}
        {showResults && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">매칭된 팀원</h2>
            {mockTeamMates.map((mate) => (
              <div
                key={mate.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* 팀원 정보 */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {mate.name} {mate.gender === 'M' ? '♂' : '♀'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      경험: {mate.experience}회 | 팔로워: {mate.followers}명
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-bold">{mate.trustScore}</span>
                    </div>
                  </div>
                </div>

                {/* 선호 장르 */}
                <div className="mb-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    선호: {mate.preference}
                  </span>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    참여하기
                  </button>
                  <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    프로필보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 요청받은 것 */}
        {!showScheduleForm && !showResults && (
          <div className="text-center py-12">
            <p className="text-gray-600">스케줄을 추가해서 팀원을 찾아보세요!</p>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
