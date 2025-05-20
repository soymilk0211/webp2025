// App.js
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Container, Typography, Box } from '@mui/material';
import './App.css';

function App() {
  // 狀態變數
  const [allData, setAllData] = useState([]); // 存儲所有原始資料
  const [filteredData, setFilteredData] = useState([]); // 存儲篩選後的資料
  const [searchText, setSearchText] = useState(''); // 存儲搜尋文字
  const [loading, setLoading] = useState(true); // 載入狀態
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  }); // 分頁模型

  // 定義列
  const columns = [
    { field: 'title', headerName: '名稱', width: 300 },
    { field: 'location', headerName: '地點', width: 200 },
  ];

  // 使用 useEffect 從 API 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 從 API 獲取資料
        const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
        const data = await response.json();
        
        // 處理資料，將其轉換為 DataGrid 可用的格式
        const processedData = data.map((item, index) => ({
          id: index, // DataGrid 需要唯一的 id
          title: item.title || "",
          location: (item.showInfo && item.showInfo[0] && item.showInfo[0].location) ? item.showInfo[0].location : ""
        }));
        
        // 更新狀態
        setAllData(processedData);
        setFilteredData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // 無論成功還是失敗，都設置載入狀態為 false
        setLoading(false);
      }
    };

    // 調用獲取資料的函數
    fetchData();
  }, []); // 空數組表示只在組件掛載時運行一次

  // 處理搜尋
  const handleSearchChange = (e) => {
    const keyword = e.target.value.trim();
    setSearchText(keyword);
    
    // 如果關鍵字為空，顯示所有資料
    if (keyword === "") {
      setFilteredData(allData);
    } else {
      // 否則，篩選包含關鍵字的資料
      const filtered = allData.filter(item => 
        item.title && item.title.indexOf(keyword) !== -1
      );
      setFilteredData(filtered);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        景點觀光展覽資訊
      </Typography>
      
      {/* 搜尋欄位 */}
      <TextField
        label="請輸入名稱關鍵字"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={handleSearchChange}
      />
      
      {/* DataGrid 組件 */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}

export default App;
