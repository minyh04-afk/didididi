'use client';

import BottomNav from '@/components/BottomNav';

export default function MessagePage() {
  const messages = [
    {
      id: 'msg_001',
      name: '준영이 & 지은이',
      lastMessage: '토요일 10시 어때?',
      time: '오전 10:30',
      theme: '어쩌다 탈출',
    },
    {
      id: 'msg_002',
      name: '최민서',
      lastMessage: '다음주에 만나요!',
      time: '어제',
      theme: '비밀의 문',
    },
    {
      id: 'msg_003',
      name: '박준호',
      lastMessage: '예약 완료했습니다',
      time: '지난주',
      theme: '탈출불가능 시즌2',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">💬 메시지</h1>
          <button className="text-gray-600 hover:text-gray-900">✏️</button>
        </div>

        {/* 메시지 목록 */}
        <div className="space-y-2">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <button
                key={msg.id}
                className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{msg.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{msg.theme}</p>
                  <p className="text-sm text-gray-700 truncate">{msg.lastMessage}</p>
                </div>
                <div className="ml-2 text-right">
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">메시지가 없습니다</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
