import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    duration: '10s',
    vus: 10,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(98)<300'],
    },
};

export default function () {
    http.get('http://127.0.0.1:80/api/songs');
    sleep(1);
}