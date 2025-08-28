import { useEffect, useState } from "react";
import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import api from '../utils/api';

export default function Comments({ boardId }) {
    const dummyComments = [
  {
    commentId: 1,
    userName: "태준파파",
    content: "아이들과 10번째 결말 넣는 중이에요. 다른 기능도 추가해주시길..",
    createdAt: "2025-08-17"
  },
  {
    commentId: 2,
    userName: "민지",
    content: "나도 별주부전 읽어볼래!!",
    createdAt: "2025-08-16"
  },
  {
    commentId: 3,
    userName: "준영",
    content: " 🤯 거북이가 바보같아 ㅋㅋ",
    createdAt: "2025-08-15"
  }
];
  
  
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState("");



  // 댓글 리스트 불러오기
  const fetchComments = async () => {
    try {
      const res = await api.get(`/api/comments?boardId=${boardId}`);
      setComments(res.data || []);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  };

  // 마운트 시 댓글 불러오기
  useEffect(() => {
    if (boardId) {
      fetchComments();
    }
  }, [boardId]);

  // 댓글 등록
  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post("/api/comments/insert", {
        boardId,
        content: newComment
        // userId는 로그인 붙으면 같이 넘기면 됨
      });
      setNewComment("");
      fetchComments(); // 등록 후 다시 불러오기
    } catch (err) {
      console.error("댓글 등록 실패:", err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* 댓글 입력창 */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}
        style={{ 
            backgroundColor: "#50e054ff", }}>
          등록
        </Button>
      </Box>

      {/* 댓글 리스트 */}
      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          아직 댓글이 없습니다.
        </Typography>
      ) : (
        comments.map((c, idx) => (
          <Box key={c.commentId} sx={{ mb: 2 }}>
            {/* 유저명 */}
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {c.userName ?? "익명"}
            </Typography>
            {/* 댓글 내용 */}
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {c.content}
            </Typography>
            {/* 작성일 */}
            <Typography variant="caption" color="text.secondary">
              {c.createdAt}
            </Typography>

            {/* 구분선 */}
            {idx < comments.length - 1 && <Divider sx={{ mt: 1.5 }} />}
          </Box>
        ))
      )}
    </Box>
  );
}