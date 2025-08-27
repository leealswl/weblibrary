import { useEffect, useState } from 'react';
import * as React from 'react';
import { DataGrid, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import "../../styles/Board.style.css";
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import PageBanner from "../../components/PageBanner";
import boardBanner from "../../assets/board.png";
import { Typography } from '@mui/material';


function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handleChange = (_e, value) => {
    apiRef.current.setPage(value - 1);
  };

  return (
    
    <Pagination
      count={pageCount}
      page={page + 1}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      hideNextButton={false}
      hidePrevButton={false}
      siblingCount={8}   // 숫자 많이 보이게 조절
      boundaryCount={2}
      // 필요하면 sx로 외형 더 커스터마이즈
      // sx={{ '& .MuiPaginationItem-root': { borderRadius: 0 } }}
    />
  );
}

export default function Board() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);



  // --- 검색 폼 상태(동작 연결) ---
  const [field, setField] = useState('title');
  const [query, setQuery] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 80, headerClassName: 'header-blue', align: 'center', headerAlign: 'center' },
    { field: 'bookName', headerName: '도서정보', flex: 1.2, minWidth: 220, headerClassName: 'header-blue'},
    { field: 'title', headerName: '제목', flex: 3, minWidth: 400, headerClassName: 'header-blue', headerAlign: 'center', 
      renderCell: (params) => (
      <Link
        to={`/board/${params.row.id}`}           
        onClick={(e) => e.stopPropagation()}
        style={{ textDecoration: 'none', cursor: 'hild', display: 'block', width: '100%' , color: 'black'}}
    >  
      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {params.value ?? '(제목 없음)'}
    </span>
      </Link>
    )
      
    },
    { field: 'userName', headerName: '작성자', flex: 1, minWidth: 140, headerClassName: 'header-blue', align: 'center', headerAlign: 'center'},
    { field: 'bookScore', headerName: '평점', flex: 0.6, minWidth: 100, headerClassName: 'header-blue', align: 'center', headerAlign: 'center',
      renderCell: (params) => (
    <Rating value={Number(params.value) || 0} precision={0.5} readOnly size="small" />
  )
    },
  ];

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/board');
        const mapped = (res.data || []).map((r) => ({
          id: r.boardId,
          bookName: r.bookName,
          title: r.title,
          userName: r.userName,
          bookScore: r.bookScore,
        }));
        setRows(mapped);
      } catch (e) {
        setErr(e.message || '불러오기 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = async () => {
    // 1) 서버 검색 연결 예 (권장)
    // const res = await api.get('/api/board', { params: { weekday, field, q: query }});
    // setRows(map(res.data));

    // 2) 임시 클라 필터 (데모용)
    // NOTE: 실제로는 서버 쿼리가 좋아.
    // setRows(prev => prev.filter(r => String(r[field] ?? '').includes(query)));
  };

  if (loading) return <div style={{ padding: 16 }}>로딩중…</div>;
  if (err) return <div style={{ color: 'red', padding: 16 }}>에러: {err}</div>;

  return (
  <React.Fragment>
    {/* <CssBaseline /> */}
    
      <PageBanner
        title="커뮤니티"
        subtitle="함께 나누는 책 이야기"
        bgImage={boardBanner}
      />
        <Box sx={{ py: 4, textAlign: "center", bgcolor: "#faf6ef", borderRadius: 2, mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              mb: 1, 
              fontFamily: "'KyoboHand','sans-serif'"
            }}
          >
            📚 BooKids 커뮤니티는
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 1, 
              fontSize: "1.1rem", 
              color: "text.secondary", 
              fontFamily: "'KyoboHand','sans-serif'" 
            }}
          >
            독서와 사유를 나누는 작은 서재입니다.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 2, 
              fontSize: "1.1rem", 
              color: "text.secondary", 
              fontFamily: "'KyoboHand','sans-serif'" 
            }}
          >
            당신의 글이 이 공간을 채워갑니다.
          </Typography>

          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/board/write"
            sx={{ px: 4, py: 1.2, fontWeight: 600, fontFamily: "'KyoboHand','sans-serif'" }}
          >
            ✍️ 글쓰기
          </Button>
        

      <Container
        maxWidth={false}
        sx={{ maxWidth: 1200, mx: 'auto', px: 2, mt: 4 }} // ★ CHANGED: 컨테이너 최대폭 커스텀
      >
        {/* 하단 검색/글쓰기 바 - 컨테이너 하단 sticky */}
        <Box
          sx={{
            //position: "sticky",       
            bottom: 0,                // ★ CHANGED
            bgcolor: "#faf6ef",
            py: 1.5,
            mt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 2,
            alignItems: "center"
          }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="field-label">검색</InputLabel>
            <Select
              labelId="field-label"
              label="검색"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <MenuItem value="title">제목</MenuItem>
              <MenuItem value="bookName">도서정보</MenuItem>
              <MenuItem value="userName">작성자</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="검색어"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: 280 }}
          />

          <Button variant="contained" onClick={handleSearch}
          style={{ 
              backgroundColor: "#569955ff"}}>
            찾기
          </Button>

          <Box sx={{ flexGrow: 1 }} />
        </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick    // ← 링크 클릭 시 체크박스/선택 변화 방지
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            unstable_autoHeight
            headerHeight={56}
            rowHeight={52}
            slots={{ pagination: CustomPagination }} // ★ CHANGED: 커스텀 페이지네이션 연결(위에서 선언 필요)
            sx={{
              border: 0,
              backgroundColor: "#faf6ef",
              "& .MuiDataGrid-main": { bgcolor: "#faf6ef" },
              "& .MuiDataGrid-virtualScroller": { bgcolor: "#faf6ef" },
              "& .MuiDataGrid-virtualScrollerContent": { bgcolor: "#faf6ef" },
              "& .MuiDataGrid-row": { bgcolor: "#faf6ef" },
              "& .MuiDataGrid-cell": { bgcolor: "#faf6ef" },
              "& .MuiDataGrid-footerContainer": {
                bgcolor: "#faf6ef",
                justifyContent: "center",
              },
              "& .header-blue": {
                backgroundColor: "#d8b77dff",
                color: "#333",
                fontWeight: "bold",
                fontFamily: "'KyoboHand', sans-serif",
                fontSize: 20
              },
              "& .MuiDataGrid-footerContainer": {
                justifyContent: "center" // ★ CHANGED: 중앙 정렬(보조용, CustomPagination 래퍼와 함께 사용)
              }
            }}
          />
      </Container>
  </Box>          
  </React.Fragment>
);
}