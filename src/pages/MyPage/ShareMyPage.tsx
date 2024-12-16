import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { S } from './MyPage.style';
import MyGridBox from './components/MyGridBox';
import Popup from './components/Popup';
import { GetShareBlack, GetShareWhite } from 'api/my';

const ShareMyPage: React.FC = () => {
  const { nickname, id, mode } = useParams<{
    nickname: string;
    id: string;
    mode: string;
  }>();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [items, setItems] = useState([]);
  const isDarkMode = mode === 'black';

  useEffect(() => {
    // URL 복사 후 팝업 표시
    const url = `${window.location.origin}/${nickname}/${id}/${mode}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsPopupVisible(true);
    });
  }, [nickname, id, mode]);

  useEffect(() => {
    const GetMyList = async () => {
      try {
        const response = isDarkMode ? await GetShareBlack() : await GetShareWhite();

        setItems(response.data.posts || []);
        console.log('마이페이지 데이터:', response.data.content_list);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };

    GetMyList();
  }, [isDarkMode]);

  return (
    <S.Wrapper>
      <S.Top>
        <S.Title>
          2024년
          <br />
          {nickname}님의 가슴을
          <br />
          뛰게 만든
        </S.Title>
      </S.Top>
      <MyGridBox data={items} num="14.4rem" />
      {isPopupVisible && (
        <Popup type="clipboard" onClose={() => setIsPopupVisible(false)} />
      )}
    </S.Wrapper>
  );
};

export default ShareMyPage;
