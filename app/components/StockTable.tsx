import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Button } from 'antd';
import { CONFIG } from '~/constants';
import type { ChannelType } from '~/constants';

const TableContainer = styled.div`
  padding: 24px;
`;

const ControlsContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelButtons = styled.div`
  display: flex;
  gap: 8px;
  
  .ant-btn {
    border-radius: 6px;
    font-weight: 500;
  }
`;

const GridContainer = styled.div`
  height: 600px;
  width: 100%;
  
  .ag-theme-alpine {
    --ag-header-background-color: #fafafa;
    --ag-header-foreground-color: #333;
    --ag-border-color: #e8e8e8;
  }
`;

interface StockData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  channel: ChannelType;
}

const SAMPLE_DATA: StockData[] = [
  { id: '1', symbol: 'AAPL', name: '애플', price: 150.25, change: 2.15, changePercent: 1.45, volume: 1234567, channel: 'US' },
  { id: '2', symbol: '005930', name: '삼성전자', price: 65000, change: -1500, changePercent: -2.26, volume: 8765432, channel: 'KR' },
  { id: '3', symbol: 'TSLA', name: '테슬라', price: 220.80, change: 8.40, changePercent: 3.96, volume: 2345678, channel: 'US' },
  { id: '4', symbol: '000660', name: 'SK하이닉스', price: 89500, change: 2000, changePercent: 2.29, volume: 4567890, channel: 'KR' },
  { id: '5', symbol: 'CRYPTO_BTC', name: '비트코인', price: 45000, change: 1200, changePercent: 2.74, volume: 567890, channel: 'OTC' },
];

export const StockTable: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | 'ALL'>('ALL');

  const columnDefs: ColDef[] = useMemo(() => [
    { 
      field: 'symbol', 
      headerName: '심볼', 
      width: 100,
      pinned: 'left'
    },
    { 
      field: 'name', 
      headerName: '종목명', 
      width: 150,
      pinned: 'left'
    },
    { 
      field: 'price', 
      headerName: '현재가', 
      width: 120,
      type: 'numericColumn',
      valueFormatter: (params) => params.value?.toLocaleString()
    },
    { 
      field: 'change', 
      headerName: '등락액', 
      width: 100,
      type: 'numericColumn',
      cellStyle: (params) => ({
        color: params.value > 0 ? '#f5222d' : params.value < 0 ? '#1890ff' : '#000'
      }),
      valueFormatter: (params) => {
        const value = params.value;
        if (value > 0) return `+${value.toLocaleString()}`;
        return value?.toLocaleString();
      }
    },
    { 
      field: 'changePercent', 
      headerName: '등락율(%)', 
      width: 120,
      type: 'numericColumn',
      cellStyle: (params) => ({
        color: params.value > 0 ? '#f5222d' : params.value < 0 ? '#1890ff' : '#000'
      }),
      valueFormatter: (params) => {
        const value = params.value;
        if (value > 0) return `+${value.toFixed(2)}%`;
        return `${value?.toFixed(2)}%`;
      }
    },
    { 
      field: 'volume', 
      headerName: '거래량', 
      width: 120,
      type: 'numericColumn',
      valueFormatter: (params) => params.value?.toLocaleString()
    },
    { 
      field: 'channel', 
      headerName: '채널', 
      width: 80,
      cellRenderer: (params: any) => {
        const channel = CONFIG.CHANNELS[params.value as ChannelType];
        return `<span style="
          background-color: ${channel.bgColor}; 
          color: ${channel.pointColor};
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        ">${channel.name}</span>`;
      }
    }
  ], []);

  const filteredData = useMemo(() => {
    if (selectedChannel === 'ALL') return SAMPLE_DATA;
    return SAMPLE_DATA.filter(item => item.channel === selectedChannel);
  }, [selectedChannel]);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <TableContainer>
      <ControlsContainer>
        <ChannelButtons>
          <Button 
            type={selectedChannel === 'ALL' ? 'primary' : 'default'}
            onClick={() => setSelectedChannel('ALL')}
          >
            전체
          </Button>
          {Object.values(CONFIG.CHANNELS).map((channel) => (
            <Button
              key={channel.id}
              type={selectedChannel === channel.id.toUpperCase() as ChannelType ? 'primary' : 'default'}
              style={{
                backgroundColor: selectedChannel === channel.id.toUpperCase() as ChannelType ? channel.pointColor : undefined,
                borderColor: channel.pointColor,
                color: selectedChannel === channel.id.toUpperCase() as ChannelType ? 'white' : channel.pointColor,
              }}
              onClick={() => setSelectedChannel(channel.id.toUpperCase() as ChannelType)}
            >
              {channel.name}
            </Button>
          ))}
        </ChannelButtons>
      </ControlsContainer>

      <GridContainer>
        <AgGridReact
          className="ag-theme-alpine"
          columnDefs={columnDefs}
          rowData={filteredData}
          onGridReady={onGridReady}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          animateRows={true}
          rowHeight={40}
          headerHeight={44}
        />
      </GridContainer>
    </TableContainer>
  );
};