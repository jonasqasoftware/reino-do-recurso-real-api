import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '15s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300'],
    checks: ['rate>0.99'],
  },
};

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const response = http.get(`${baseUrl}/convocarMago`);
  check(response, {
    'status is 200': (result) => result.status === 200,
    'response is JSON': (result) => result.headers['Content-Type']?.includes('application/json'),
    'collection is not empty': (result) => result.json().length > 0,
  });
  sleep(0.2);
}
