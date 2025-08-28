import React, { useState, useRef } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BookEdit() {
  const [uploaded, setUploaded] = useState({});
  const navigate = useNavigate();
  const fileInputRefs = useRef({}); // 각 input에 대한 ref 저장
  
  // 업로드 처리
  const handleUpload = (index, file) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    setUploaded((prev) => ({...prev, [index]: fileURL }));
  };

  const handleViewBook = () => {
    console.log('버튼 클릭됨!', uploaded);
    // 업로드된 이미지를 sessionStorage에 임시 저장
    sessionStorage.setItem('uploadedImages', JSON.stringify(uploaded));
    console.log('sessionStorage 저장 완료');
    // BookView 페이지로 이동
    navigate('/recommand/view');
    console.log('navigate 호출 완료');
  };

  // 파일 입력 클릭 핸들러
  const handleFileInputClick = (index) => {
    // 이미 업로드된 이미지가 있으면 클릭 무시
    if (uploaded[index]) return;
    
    const input = fileInputRefs.current[index];
    if (input) {
      input.click();
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(index, file);
    }
    // 같은 파일을 다시 선택할 수 있도록 value 초기화
    event.target.value = '';
  };

  return (
    <>
      <h2 style={{ 
        textAlign: "center",
        color: "green",
        marginBottom: 20,
        fontSize: 40 }}>결말 추가하기</h2>
      
      <Grid container>
        {Array.from({ length: 16 }).map((_, i) => {
          // 0~13번 페이지: 기존 이미지들 (읽기 전용)
          if (i <= 13) {
            return (
               <Grid key={i} size={3}padding={2}>
                <img
                  src={`/images/book/page${i}.png`}
                  alt={`page${i}`}
                  style={{ width: "100%", height:"100%",borderRadius: 8}}
                />
              </Grid>
            );
          }

          // 드래그 앤 드롭 핸들러
          const handleDragOver = (e) => e.preventDefault();
          const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files[0];
            if (file) {
              handleUpload(i, file);
            }
          };
          
          // 14, 15번 페이지: 업로드 박스
          return (
            <Grid item size={3}padding={2} key={i}>
              <Box
                sx={{
                  border: uploaded[i] ? "2px solid green" : "2px dashed gray",
                  aspectRatio: "16/9",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  cursor: uploaded[i] ? "default" : "pointer",
                  overflow: "hidden",
                  backgroundColor: uploaded[i] ? "#f0f8ff" : "transparent",
                }}
                onClick={() => handleFileInputClick(i)} //라벨삭제해서 중복클릭없앴음
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {uploaded[i] ? (
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <img
                      src={uploaded[i]}
                      alt={`uploaded-${i}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div 
                      style={{ 
                        position: "absolute", 
                        top: 5, 
                        right: 5, 
                        backgroundColor: "green", 
                        color: "white", 
                        borderRadius: "50%", 
                        width: 20, 
                        height: 20, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 12 
                      }}
                    >
                      ✓
                    </div>
                    {/* 재업로드 버튼 추가 */}
                    <div 
                      style={{ 
                        position: "absolute", 
                        bottom: 5, 
                        right: 5, 
                        backgroundColor: "rgba(0,0,0,0.7)", 
                        color: "white", 
                        borderRadius: "4px", 
                        padding: "2px 6px", 
                        fontSize: 10,
                        cursor: "pointer"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const input = fileInputRefs.current[i];
                        if (input) {
                          input.click();
                        }
                      }}
                    >
                      변경
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    📷 그림을 그려 보아요<br/>
                    <small style={{ color: "gray" }}>페이지 {i + 1}</small>
                  </div>
                )}
                
                {/* 숨겨진 파일 입력 */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => fileInputRefs.current[i] = el}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(i, e)}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* 버튼을 아래쪽으로 이동 */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Button 
          variant="contained" 
          onClick={handleViewBook}
          disabled={!uploaded[14] && !uploaded[15]}
          style={{ 
            backgroundColor: (uploaded[14] || uploaded[15]) ? "#4caf50" : "#bdbdbd", 
            color: "white",
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: (uploaded[14] || uploaded[15]) ? "pointer" : "not-allowed",
            marginBottom: "30px"
          }}
        >
          📖 완성된 책 보기 ({(uploaded[14] ? 1 : 0) + (uploaded[15] ? 1 : 0)}/2)
        </Button>
      </div>
    </>
  );
}