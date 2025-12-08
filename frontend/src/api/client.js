// src/api/client.js
import api from "./axios";

// Log bonito de errores Axios
export function logAxiosError(err, label) {
  const info = {
    label,
    message: err?.message,
    status: err?.response?.status,
    statusText: err?.response?.statusText,
    url: (err?.config?.baseURL || "") + (err?.config?.url || ""),
    responseData: err?.response?.data,
    requestData: err?.config?.data ? safeParse(err.config.data) : undefined,
  };
  console.error(`[API] ${label}:`, JSON.stringify(info, null, 2));
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return s; }
}

// -------- Explore ----------
export async function fetchExplore() {
  try {
    return (await api.get("/users/explore")).data;
  } catch (err1) {
    logAxiosError(err1, "EXPLORE_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = ["/explore", "/users", "/profiles/explore"];
      for (const path of fallbacks) {
        try {
          const r = await api.get(path);
          console.log("[EXPLORE] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `EXPLORE_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}

// -------- Matches ----------
export async function fetchMatches() {
  try {
    return (await api.get("/users/matches")).data;
  } catch (err1) {
    logAxiosError(err1, "MATCHES_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = ["/matches", "/chats/matches", "/users/me/matches"];
      for (const path of fallbacks) {
        try {
          const r = await api.get(path);
          console.log("[MATCHES] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `MATCHES_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}

// -------- Chats list ----------
export async function fetchChats() {
  try {
    return (await api.get("/chats")).data;
  } catch (err1) {
    logAxiosError(err1, "CHATS_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = ["/users/chats", "/chat", "/messages/chats"];
      for (const path of fallbacks) {
        try {
          const r = await api.get(path);
          console.log("[CHATS] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `CHATS_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}

// -------- Create/Get chat with user ----------
export async function createOrGetChatWith(userId) {
  try {
    return (await api.post(`/chats/with/${userId}`)).data;
  } catch (err1) {
    logAxiosError(err1, "CHAT_WITH_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = [
        `/users/${userId}/chat`,
        `/chat/with/${userId}`,
        `/conversations/with/${userId}`,
      ];
      for (const path of fallbacks) {
        try {
          const r = await api.post(path);
          console.log("[CHAT WITH] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `CHAT_WITH_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}

// -------- Chat header ----------
export async function fetchChat(chatId) {
  try {
    return (await api.get(`/chats/${chatId}`)).data;
  } catch (err1) {
    logAxiosError(err1, "CHAT_HEADER_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = [`/chat/${chatId}`, `/conversations/${chatId}`];
      for (const path of fallbacks) {
        try {
          const r = await api.get(path);
          console.log("[CHAT HEADER] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `CHAT_HEADER_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}

// -------- Messages list ----------
export async function fetchMessages(chatId) {
  try {
    return (await api.get(`/chats/${chatId}/messages`)).data;
  } catch (err1) {
    logAxiosError(err1, "MESSAGES_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = [
        `/chat/${chatId}/messages`,
        `/conversations/${chatId}/messages`,
      ];
      for (const path of fallbacks) {
        try {
          const r = await api.get(path);
          console.log("[MESSAGES] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `MESSAGES_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}

// -------- Send message ----------
export async function sendMessageApi(chatId, text) {
  try {
    return (await api.post(`/chats/${chatId}/messages`, { text })).data;
  } catch (err1) {
    logAxiosError(err1, "SEND_MSG_PRIMARY_FAILED");
    const s = err1?.response?.status;
    if (s === 404 || s === 405) {
      const fallbacks = [
        `/chat/${chatId}/messages`,
        `/conversations/${chatId}/messages`,
      ];
      for (const path of fallbacks) {
        try {
          const r = await api.post(path, { text });
          console.log("[SEND MSG] OK vía", path);
          return r.data;
        } catch (e) {
          logAxiosError(e, `SEND_MSG_FALLBACK_FAILED ${path}`);
        }
      }
    }
    throw err1;
  }
}
