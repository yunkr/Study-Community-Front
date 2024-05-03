import axios from 'axios';

// GET 요청 예시
axios.get('http://localhost:8080/members')
  .then(response => {
    // 요청 성공 시 처리
    console.log(response.data);
  })
  .catch(error => {
    // 요청 실패 시 처리
    console.error('Error:', error);
  });