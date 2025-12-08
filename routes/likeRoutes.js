import express from 'express';

const router = express.Router();

// Ejemplo de estructura en memoria
let likes = []; // [{ fromUserId, toUserId }]
let matches = []; // [{ user1Id, user2Id }]

// Dar like
router.post('/', (req, res) => {
  const { fromUserId, toUserId } = req.body;

  if (!fromUserId || !toUserId) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Guardar el like
  likes.push({ fromUserId, toUserId });

  // Verificar si hay match (el otro usuario ya dio like antes)
  const match = likes.find(l => l.fromUserId === toUserId && l.toUserId === fromUserId);

  if (match) {
    matches.push({ user1Id: fromUserId, user2Id: toUserId });
    return res.json({ message: '¡Es un match!', match: true });
  }

  res.json({ message: 'Like registrado', match: false });
});

// Obtener matches de un usuario
router.get('/matches/:userId', (req, res) => {
  const { userId } = req.params;
  const userMatches = matches.filter(
    m => m.user1Id === userId || m.user2Id === userId
  );
  res.json(userMatches);
});

export default router;
