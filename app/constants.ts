export const CONFIG = {
  // 3개 독립 버튼용 채널 설정
  CHANNELS: {
    KR: { id: 'kr', name: '국내', bgColor: '#fff1f0', pointColor: '#f5222d' },
    US: { id: 'us', name: '해외', bgColor: '#f9f0ff', pointColor: '#722ed1' },
    OTC: { id: 'otc', name: '장외', bgColor: '#e6fffb', pointColor: '#13c2c2' }
  },
  // 드롭다운 및 수치용 자원 설정
  RESOURCES: {
    CASH: { id: 'cash', name: '현금', bgColor: '#e6f7ff', pointColor: '#1890ff' },
    CREDIT: { id: 'credit', name: '신용', bgColor: '#f6ffed', pointColor: '#52c41a' },
    LOAN: { id: 'loan', name: '담보', bgColor: '#fff7e6', pointColor: '#fa8c16' }
  }
} as const;

export type ChannelType = keyof typeof CONFIG.CHANNELS;
export type ResourceType = keyof typeof CONFIG.RESOURCES;