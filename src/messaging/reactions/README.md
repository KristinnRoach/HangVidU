# Message Reactions Feature

This directory contains the implementation of message reactions for the HangVidU messaging system.

## Overview

The reactions feature allows users to react to messages with emoji reactions. The MVP implementation supports double-tap to add a heart (❤️) reaction to any message.

## Architecture

The implementation follows a modular architecture with clear separation of concerns:

```
src/messaging/reactions/
├── index.js              # Main export file
├── ReactionConfig.js     # Configuration and reaction types
├── ReactionManager.js    # Core reaction management logic
├── ReactionUI.js         # UI rendering and interaction handling
└── ReactionManager.test.js  # Unit tests
```

## Components

### ReactionConfig.js
Defines available reaction types and configuration options:
- `DEFAULT_REACTIONS` - Object mapping reaction types to emojis
- `REACTION_CONFIG` - Configuration for behavior (double-tap delay, animations, etc.)
- `getReactionEmoji(type)` - Get emoji for a reaction type
- `getAvailableReactions()` - Get all available reactions

**Easy to extend:** Simply add new entries to `DEFAULT_REACTIONS` to support more reaction types.

### ReactionManager.js
Manages reaction state and data:
- `addReaction(messageId, reactionType)` - Add a reaction to a message
- `removeReaction(messageId, reactionType)` - Remove a reaction
- `getReactions(messageId)` - Get all reactions for a message
- `hasReactions(messageId)` - Check if message has reactions
- `getReactionCount(messageId, reactionType)` - Get count for specific reaction
- `clearReactions(messageId)` - Clear all reactions from a message

**Design principles:**
- Data-focused: Manages state, not UI
- Simple API: Easy to use from UI layer
- Fully tested: 19 unit tests covering all functionality

### ReactionUI.js
Handles UI rendering and user interactions:
- `enableDoubleTap(element, messageId, callback)` - Enable double-tap reactions on a message
- `renderReactions(element, messageId, reactions)` - Render reaction badges
- `showReactionAnimation(element, reactionType)` - Show floating emoji animation

**Features:**
- Cross-platform double-tap detection (works on mobile and desktop)
- Smooth animations
- Clean DOM management

## Usage

```javascript
import { ReactionManager, ReactionUI } from './messaging/reactions/index.js';

// Initialize
const reactionManager = new ReactionManager();
const reactionUI = new ReactionUI(reactionManager);

// Enable reactions on a message element
const messageElement = document.querySelector('.message');
const messageId = 'msg-123';

reactionUI.enableDoubleTap(messageElement, messageId, (reactions) => {
  console.log('Reactions updated:', reactions);
});
```

## Integration

The reactions feature is integrated into `messages-ui.js`:

1. ReactionManager and ReactionUI are initialized when the messages UI is created
2. Each message gets a unique ID assigned when appended to the DOM
3. Double-tap is automatically enabled on all messages (except system messages)
4. Reactions are rendered inline with messages

## Styling

Styles are defined in `src/styles/components/reactions.css`:
- `.reaction-badge` - Individual reaction display
- `.message-reactions` - Container for reactions
- `.reaction-animation` - Floating emoji animation

The styles are minimal and follow the existing design system.

## Configuration

To customize the feature, edit `ReactionConfig.js`:

```javascript
// Add more reaction types
export const DEFAULT_REACTIONS = {
  heart: '❤️',
  thumbsUp: '👍',
  laugh: '😂',
  // ... add more
};

// Adjust behavior
export const REACTION_CONFIG = {
  doubleTapDelay: 300,           // ms between taps
  defaultReaction: 'heart',       // reaction for double-tap
  maxReactionsPerMessage: 0,      // 0 = unlimited
  enableAnimations: true,
};
```

## Testing

Run the unit tests:
```bash
npm test src/messaging/reactions/ReactionManager.test.js
```

All 19 tests should pass, covering:
- Adding reactions
- Removing reactions
- Getting reaction data
- Multiple reaction types
- Edge cases

## Future Enhancements

The modular design makes it easy to add:
- More reaction types (already structured in config)
- Reaction picker UI
- Remove reactions by clicking badge
- Sync reactions across users
- Reaction persistence
- Custom reaction animations
- Reaction limits per user
