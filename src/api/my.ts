import axios from 'axios';
import { http } from './http';
import { getCookie } from './http';

// GET : 화이트 마이페이지
export const GetMyWhite = async () => {
  try {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
      throw new Error('(화이트모드) 토큰이 올바르지 않습니다.');
    }
    const response = await http.get('/main/white/mypage', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('화이트모드 마이페이지 로드 실패:', error);
    return Promise.reject(error);
  }
};

// GET : 블랙 마이페이지
export const GetMyBlack = async () => {
  try {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
      throw new Error('(다크모드) 토큰이 올바르지 않습니다.');
    }
    const response = await http.get('/main/black/mypage', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('다크모드 마이페이지 로드 실패:', error);
    return Promise.reject(error);
  }
};

// DEL : 포스트 삭제
export const DeleteMyPost = async (isDarkMode: boolean, post_id: number) => {
  const theme = isDarkMode ? 'black' : 'white';

  try {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
      throw new Error('토큰이 올바르지 않습니다.');
    }
    const response = await http.delete(`/main/${theme}/${post_id}/delete/`);
    console.log('포스트 삭제 성공');
    console.log(response);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log('포스트 삭제 실패', error);
    return Promise.reject(error);
  }
};

// GET : 화이트 공유페이지
export const GetShareWhite = async (user_id: number) => {
  try {
    const response = await http.get(`/main/whiteshare/${user_id}`);
    console.log('화이트모드 공유페이지 로드 성공:', response);
    return response.data;
  } catch (error) {
    console.error('화이트모드 공유페이지 로드 실패:', error);
    return Promise.reject(error);
  }
};

// GET : 블랙 공유페이지
export const GetShareBlack = async (user_id: number) => {
  try {
    const response = await http.get(`/main/whiteshare/${user_id}`);
    console.log('다트모드 공유페이지 로드 성공:', response);
    return response.data;
  } catch (error) {
    console.error('다크모드 공유페이지 로드 실패:', error);
    return Promise.reject(error);
  }
};
