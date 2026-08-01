import http from "k6/http";
import { check, sleep } from "k6";

// PERF TEST: Load testing endpoints (simulating traffic)
export const options = {
  vus: 50,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const res = http.get("http://[::1]:3000/products");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "protocol is HTTP/1.1": (r) => r.proto === "HTTP/1.1",
  });

  sleep(1);
}
