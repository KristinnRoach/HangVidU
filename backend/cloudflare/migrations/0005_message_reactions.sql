-- One current reaction per user per persisted message.
CREATE TABLE message_reactions (
  message_id   TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_key TEXT NOT NULL CHECK (length(reaction_key) BETWEEN 1 AND 64),
  PRIMARY KEY (message_id, user_id)
);

CREATE INDEX idx_message_reactions_user ON message_reactions(user_id);
