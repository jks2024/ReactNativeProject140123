import axios from 'axios';
//const SERVER_DOMAIN = 'http://localhost:8111';
const SERVER_DOMAIN = 'http://192.168.110.38:8111';
//const SERVER_DOMAIN = 'http://172.30.1.13:8111';

const AxiosApi = {
  // 로그인
  memberLogin: async (email, pw) => {
    const login = {
      email: email,
      pwd: pw,
    };
    return await axios.post(SERVER_DOMAIN + '/auth/login', login);
  },
  // 회원 가입 여부 확인
  memberRegCheck: async email => {
    return await axios.get(SERVER_DOMAIN + `/auth/exists/${email}`);
  },
  // 회원 가입
  memberReg: async (email, pwd, name) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
    };
    return await axios.post(SERVER_DOMAIN + '/auth/signup', member);
  },
  membersGet: async () => {
    return await axios.get(SERVER_DOMAIN + '/users/list');
  },
  memberGetOne: async email => {
    return await axios.get(SERVER_DOMAIN + `/users/detail/${email}`);
  },
  // 회원 정보 수정
  menberUpdate: async (email, name, image) => {
    console.log('회원 정보 수정 : ', email, name, image);
    const member = {
      email: email,
      name: name,
      image: image,
    };
    return await axios.put(SERVER_DOMAIN + '/users/modify', member);
  },
  // 카테고리 조회
  cateList: async () => {
    return await axios.get(SERVER_DOMAIN + '/api/category/list');
  },
  // 카테고리 등록
  cateInsert: async (email, category) => {
    const cate = {
      email: email,
      categoryName: category,
    };
    return await axios.post(SERVER_DOMAIN + '/api/category/new', cate);
  },
  // 카테고리 삭제
  cateDelete: async categoryId => {
    return await axios.delete(
      SERVER_DOMAIN + `/api/category/delete/${categoryId}`,
    );
  },
  // 게시글 목록
  boardList: async () => {
    return await axios.get(SERVER_DOMAIN + '/api/board/list');
  },
  // 게시글 쓰기
  boardWrite: async (email, title, category, content, fileUri) => {
    console.log('게시글 쓰기 : ', email, title, category, content, fileUri);
    const board = {
      email: email,
      title: title,
      categoryId: category,
      content: content,
      img: fileUri,
    };
    return await axios.post(SERVER_DOMAIN + '/api/board/new', board);
  },
};

export default AxiosApi;
