import React from 'react';
import styled from 'styled-components';
import type { StockData } from '~/hooks/useStockTable';

const DetailContainer = styled.div`
  padding: 16px 24px;
  background-color: #fafafa;
  border-top: 1px solid #e8e8e8;
  display: flex;
  gap: 32px;
`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

interface StockDetailRendererProps {
  data: StockData;
}

export const StockDetailRenderer: React.FC<StockDetailRendererProps> = ({ data }) => {
  return (
    <DetailContainer>
      <DetailGroup>
        <DetailLabel>종목 ID</DetailLabel>
        <DetailValue>{data.id}</DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>심볼</DetailLabel>
        <DetailValue>{data.symbol}</DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>종목명</DetailLabel>
        <DetailValue>{data.name}</DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>현재가</DetailLabel>
        <DetailValue>{data.price.toLocaleString()}</DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>변동액</DetailLabel>
        <DetailValue style={{ color: data.change > 0 ? '#f5222d' : data.change < 0 ? '#1890ff' : '#000' }}>
          {data.change > 0 ? '+' : ''}{data.change.toLocaleString()}
        </DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>변동률</DetailLabel>
        <DetailValue style={{ color: data.changePercent > 0 ? '#f5222d' : data.changePercent < 0 ? '#1890ff' : '#000' }}>
          {data.changePercent > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
        </DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>거래량</DetailLabel>
        <DetailValue>{data.volume.toLocaleString()}</DetailValue>
      </DetailGroup>
      <DetailGroup>
        <DetailLabel>채널</DetailLabel>
        <DetailValue>{data.channel}</DetailValue>
      </DetailGroup>
    </DetailContainer>
  );
};
