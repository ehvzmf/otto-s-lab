import React from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'antd';
import { CONFIG } from '~/constants';
import type { ChannelType } from '~/constants';
import { useStockTable } from '~/hooks/useStockTable';

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
    height: 100%;
    width: 100%;
  }
`;

export const StockTable: React.FC = () => {
  const {
    selectedChannel,
    setSelectedChannel,
    columnDefs,
    filteredData,
    onGridReady,
  } = useStockTable();

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
        <div className="ag-theme-alpine">
          <AgGridReact
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
        </div>
      </GridContainer>
    </TableContainer>
  );
};