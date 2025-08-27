
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookReader from "../../components/BookShelf/BookReader";


export default function BookView() {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState({});

  useEffect(() => {
    // sessionStorage에서 업로드된 이미지 불러오기
    const saved = sessionStorage.getItem('uploadedImages');
    console.log(saved)
    if (saved) {
      setUploadedImages(JSON.parse(saved));
    }
    console.log('d',uploadedImages[14])
  }, []);

  // 전체 페이지 데이터 생성
  const generatePagesData = () => {
    const pages = [];
    const pagess = [  
    { image: "/images/book/page0.png" },
    { image: "/images/books/page1.png" },
    { text: "푸른 바다의 용궁에 큰 걱정거리가 생겼어요. 용왕님이 배앓이로 끙끙 앓자, 의사 물고기들이 “토끼의 간을 먹으면 낫는다”라 말했답니다. 용왕님은 별주부에게 토끼를 데려오라 명했어요." },

    { image: "/images/books/page3.png" },
    { text: "별주부는 토끼 그림을 들고 육지로 나왔어요. 낯선 세상에 놀라며 두리번대던 별주부 앞에 그림 속과 똑같은 토끼가 나타났답니다. 별주부의 가슴이 콩닥콩닥 뛰었지요." },

    { image: "/images/books/page5.png" },
    { text: "별주부는 토끼에게 다가가 용왕님이 지혜롭고 재주 많은 토끼를 만나고 싶다 전했어요. 반짝이는 보물과 맛있는 산해진미가 가득하다 말하자, 토끼는 혹해졌답니다." },

    { image: "/images/books/page7.png" },
    { text: "토끼는 솔깃해 별주부의 등에 올라탔어요. 첨벙 바닷속으로 들어가니 알록달록한 물고기와 산호들이 보였죠. 토끼는 눈이 휘둥그레진 채 용궁으로 향했답니다." },

    { image: "/images/books/page9.png" },
    { text: "용궁에 도착한 토끼는 반짝이는 궁전과 신하들의 환영에 놀랐어요. 그러나 용왕님의 아픈 얼굴을 보고 의아해했죠. 별주부는 자랑스럽게 토끼를 모셨다고 보고했답니다." },

    { image: "/images/books/page11.png" },
    { text: "용왕님은 힘없는 목소리로 토끼에게 고마움을 전했어요. 하지만 곧 “토끼의 간을 가져오라, 그것만이 병을 낫게 한다”라 명령했답니다. 토끼는 깜짝 놀랐어요." },

    { image: "/images/books/page13.png" },
    { text: "토끼는 자신이 속아왔음을 깨달았어요. 용왕님이 원한 것은 보물이나 지혜가 아닌 자기 간이었거든요. 간을 빼앗길까 두려워, 토끼는 재빨리 꾀를 짜내기 시작했답니다." },

    { image: "/images/books/page15.png" },
    { text: "“용왕님, 제 간은 귀해 몸에 두지 않고 안전한 곳에 보관해둡니다!” 토끼가 둘러대자, 별주부는 속으로 의심했어요. ‘간을 몸 밖에 둔다니, 말도 안 돼!’" },

    { image: "/images/books/page17.png" },
    { text: "용왕님은 혹해했지만, 별주부는 “거짓말입니다! 간은 몸속에 있습니다!”라며 막았어요. 토끼는 끝까지 우겼고, 둘은 큰 소리로 다투기 시작했답니다." },

    { image: "/images/books/page19.png" },
    { text: "혼란스러운 용왕님은 고민 끝에 토끼의 말에 솔깃했어요. “별주부, 다시 육지에 가서 토끼의 간을 가져오너라.” 별주부는 울며 겨자 먹기로 따를 수밖에 없었죠." },

    { image: "/images/books/page21.png" },
    { text: "토끼는 속으로 크게 웃었어요. ‘이제 살았다! 간을 빼앗길 뻔했지만 오히려 용왕님을 속였지!’ 두려움은 사라지고, 오히려 뿌듯해졌답니다." },

    { image: "/images/books/page23.png" },
    { text: "토끼는 별주부 등에 다시 올라탔어요. 물고기 신하들은 토끼가 돌아올 거라 믿었지만, 토끼는 이미 빠져나갈 생각에 슬며시 웃었답니다." },

    { image: "/images/books/page25.png" },
    { text: "육지에 도착하자 토끼는 풀밭으로 뛰며 혀를 쏙 내밀었어요. “간을 두고 다니는 동물이 어디 있어요? 용왕님께 전해요, 필요하면 육지로 찾아오라구요!”" },

    { image: "/images/books/page27.png" },
    { text: "별주부는 속았음을 깨닫고 주저앉아 울었어요. 토끼는 멀리 달아났고, 간을 구하지 못해 용왕님의 병은 낫지 못할 터. 별주부는 큰 벌을 두려워하며 눈물을 흘렸답니다." },
  ];

    // 0~13번 페이지: 기존 이미지들
    for (let i = 0; i <= 28; i++) {
      pages.push({
        image: `${pagess[i].image}`,
        text: i % 2 === 0 ? `${pagess[i].text}` : null
      });
    }
    
    // 14, 15번 페이지: 업로드된 이미지들

    if (uploadedImages[14]) {
      pages.push({ image: uploadedImages[14] });
    }
    if (uploadedImages[14]) {
      pages.push({ text: '거북이는 인내심을 갖고 매복하여 결국 토끼를 잡았습니다' });
    }

    if (uploadedImages[15]) {
      pages.push({ image: uploadedImages[15] });
    }
    if (uploadedImages[15]) {
      pages.push({ text: '그리고는 산채로 간을 꺼내서 용궁으로 돌아갔고 용왕님의 병은 낫고 모두 행복해졌답니다.' });
    }
        return pages;
      };

  const handleBackToEdit = () => {
    navigate('/recommand/edit');
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ color: "green", marginBottom: 10 }}>📖 완성된 동화책</h2>
        <Button 
          variant="contained" 
          onClick={handleBackToEdit}
          style={{ backgroundColor: "green", color: "white" }}
        >
          ← 편집 모드로 돌아가기
        </Button>
      </div>
      
      <BookReader pages={generatePagesData()} />
      <Stack></Stack>
      <Stack></Stack>
    </div>
  );
}