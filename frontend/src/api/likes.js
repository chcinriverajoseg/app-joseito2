import api from './axios';

export const sendLike = async (fromUserId, toUserId) => {
  const res = await api.post('/likes', { fromUserId, toUserId });
  return res.data;
};

export const getMatches = async (userId) => {
  const res = await api.get(`/likes/matches/${userId}`);
  return res.data;
};
