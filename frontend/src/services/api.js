// import { getIdTokenOrThrow } from "../auth";

// const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

// export async function apiFetch(path, options = {}) {
//   const token = await getIdTokenOrThrow(false);

//   const headers = new Headers(options.headers || {});
//   headers.set("Authorization", `Bearer ${token}`);
//   if (!headers.has("Content-Type") && options.body) {
//     headers.set("Content-Type", "application/json");
//   }

//   let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

//   // nếu token hết hạn, thử refresh 1 lần rồi gọi lại
//   if (res.status === 401) {
//     const newToken = await getIdTokenOrThrow(true);
//     headers.set("Authorization", `Bearer ${newToken}`);
//     res = await fetch(`${API_BASE}${path}`, { ...options, headers });
//   }

//   return res;
// }
