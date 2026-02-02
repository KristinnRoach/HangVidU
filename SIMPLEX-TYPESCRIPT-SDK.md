# SimpleX TypeScript SDK

## What is the SimpleX TypeScript SDK?

The **SimpleX TypeScript SDK** (npm package: `simplex-chat`) is a JavaScript/TypeScript library that provides a WebSocket API client for the [SimpleX Chat](https://github.com/simplex-chat/simplex-chat) messaging protocol. It enables developers to build applications that interact with SimpleX Chat, a privacy-focused messaging platform that uniquely operates without any user identifiers.

## What is it meant for?

The SimpleX TypeScript SDK is designed for building:

### 1. **Chat Bots**
Create automated bots that can:
- Connect with SimpleX Chat users
- Respond to messages automatically
- Facilitate connections between users through groups
- Implement custom business logic

### 2. **Equipment Control**
Securely control remote systems:
- Server management and automation
- Home automation systems
- IoT device control
- More secure than traditional REST APIs due to SimpleX's built-in authorization and encryption

### 3. **Custom Chat Applications**
Build your own chat applications using the SimpleX protocol:
- Desktop chat clients
- Web-based messaging interfaces
- Specialized communication tools
- Integration layers for existing applications

### 4. **Integration and Automation**
Connect SimpleX Chat with other systems:
- Notification systems
- Workflow automation
- Data collection and processing
- Cross-platform communication bridges

## Can it be used to create your own chat app?

**Yes, absolutely!** The SimpleX TypeScript SDK can be used to create your own chat application. However, it's important to understand the architecture:

### How it Works

The SimpleX TypeScript SDK is a **client library** that communicates with the SimpleX Chat CLI (Command Line Interface) application, which runs as a WebSocket server:

```bash
# Start SimpleX Chat as a WebSocket server
simplex-chat -p 5225
```

Your application then connects to this server using the SDK:

```javascript
const {ChatClient} = require("simplex-chat")

const chat = await ChatClient.create("ws://localhost:5225")
```

### Key Features for Building Chat Apps

The SDK provides comprehensive chat functionality:

1. **User Profile Management**
   - Create and modify user profiles
   - Manage display names and profile information

2. **Contact Management**
   - Create and accept contact invitations
   - Manage long-term user addresses
   - Automatic acceptance of contact connections

3. **Group Communication**
   - Create and join groups
   - Manage group members
   - Group messaging

4. **File Transfer**
   - Send and receive files
   - Handle file attachments

5. **Real-time Messaging**
   - Send and receive text messages
   - Event-driven message processing
   - Support for various message types

## Basic Example: Simple Chat Bot

```javascript
const {ChatClient} = require("simplex-chat")
const {ChatType} = require("simplex-chat/dist/command")

async function run() {
  // Connect to SimpleX Chat server
  const chat = await ChatClient.create("ws://localhost:5225")
  
  // Get active user profile
  const user = await chat.apiGetActiveUser()
  console.log(`Bot profile: ${user.profile.displayName}`)
  
  // Create or get long-term address
  const address = await chat.apiGetUserAddress() || 
                  await chat.apiCreateUserAddress()
  console.log(`Bot address: ${address}`)
  
  // Enable automatic acceptance of connections
  await chat.enableAddressAutoAccept()
  
  // Process incoming messages
  for await (const resp of chat.msgQ) {
    if (resp.type === "contactConnected") {
      // Send welcome message to new contacts
      await chat.apiSendTextMessage(
        ChatType.Direct,
        resp.contact.contactId,
        "Hello! Welcome to my custom chat app."
      )
    }
    
    if (resp.type === "newChatItems") {
      // Handle incoming messages
      for (const {chatInfo, chatItem} of resp.chatItems) {
        // Process and respond to messages
        console.log("Received message:", chatItem)
      }
    }
  }
}
```

## How SimpleX Differs from HangVidU's Current Architecture

### HangVidU (Current Implementation)
- **Technology**: Firebase Realtime Database + WebRTC
- **Use Case**: 1-to-1 video chat with watch-together functionality
- **Architecture**: 
  - Firebase for signaling and message storage
  - WebRTC Data Channels for peer-to-peer communication
  - Custom messaging implementation
- **Focus**: Video calling and media synchronization

### SimpleX TypeScript SDK
- **Technology**: SimpleX protocol (privacy-focused messaging)
- **Use Case**: Secure, private text messaging and file transfer
- **Architecture**:
  - No user identifiers (maximum privacy)
  - Requires SimpleX CLI running as WebSocket server
  - SDK acts as a client to the CLI
  - End-to-end encrypted by default
- **Focus**: Privacy, security, and decentralized communication

## Installation

```bash
npm install simplex-chat
```

Or with yarn:

```bash
yarn add simplex-chat
```

## Prerequisites

To use the SimpleX TypeScript SDK, you need:

1. **SimpleX Chat CLI** installed and running as a WebSocket server
   ```bash
   simplex-chat -p 5225 -d /path/to/database
   ```

2. **Node.js** environment for running your application

## Documentation and Resources

- **GitHub Repository**: [simplex-chat/simplex-chat](https://github.com/simplex-chat/simplex-chat)
- **npm Package**: [simplex-chat](https://www.npmjs.com/package/simplex-chat)
- **TypeScript Types**: [@simplex-chat/types](https://www.npmjs.com/package/@simplex-chat/types)
- **Client API Source**: [client.ts](https://github.com/simplex-chat/simplex-chat/blob/stable/packages/simplex-chat-client/typescript/src/client.ts)
- **Examples**: [TypeScript examples directory](https://github.com/simplex-chat/simplex-chat/tree/stable/packages/simplex-chat-client/typescript/examples)

## Use Cases in Context of HangVidU

While HangVidU currently focuses on video chat, the SimpleX TypeScript SDK could potentially be integrated for:

1. **Enhanced Privacy**: Add end-to-end encrypted text chat alongside video calls
2. **Secure Signaling**: Replace Firebase signaling with SimpleX for more privacy
3. **Contact Management**: Leverage SimpleX's privacy-focused contact system
4. **File Sharing**: Utilize SimpleX's secure file transfer capabilities
5. **Chat Bots**: Add automated assistants for scheduling or coordinating calls

However, integrating SimpleX would require significant architectural changes and running additional infrastructure (SimpleX CLI servers).

## License

SimpleX TypeScript SDK is licensed under **AGPL v3**.

## Conclusion

The SimpleX TypeScript SDK is a powerful tool for building privacy-focused chat applications and bots. While it can absolutely be used to create your own chat app, it requires running the SimpleX Chat CLI as a backend service and is best suited for applications where maximum privacy and the absence of user identifiers are priorities.

For HangVidU's current use case (video chat with watch-together), the Firebase + WebRTC stack is more appropriate, but SimpleX could be considered for future privacy enhancements or text-based communication features.
