# Node.js Fundamentals: Detailed Guide with Examples and Use Cases

This guide provides a detailed explanation of Node.js fundamentals, including sample code snippets and real-time use cases, tailored for a backend developer preparing for an interview

## 1. Architecture

### Explanation

Node.js uses a **single-threaded, non-blocking I/O model** powered by the V8 JavaScript engine and the `libuv` library. It employs an **event-driven architecture**, where operations like file reading or network requests are handled asynchronously, preventing the main thread from blocking. The event loop manages asynchronous tasks, ensuring efficient handling of multiple operations. `libuv` provides the event loop and thread pool for tasks like file system operations.

### Real-Time Use Case

A web server handling thousands of simultaneous HTTP requests (e.g., a chat application) benefits from non-blocking I/O, allowing it to process requests without waiting for database queries or file operations to complete.

### Sample Code

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  // Non-blocking response
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**Explanation**: This creates a simple HTTP server. The event-driven nature allows it to handle multiple client requests concurrently without blocking the main thread.

---

## 2. Modules

### Explanation

Node.js uses modules to organize code. **CommonJS** (`require`, `module.exports`) is the traditional module system, while **ES Modules** (`import`, `export`) are supported in newer Node.js versions. Built-in modules like `fs` (file system), `http` (HTTP server), `path` (file paths), `url` (URL parsing), and `events` (event handling) provide core functionality without external dependencies.

### Real-Time Use Case

In a blogging platform, the `fs` module reads markdown files for blog posts, `path` resolves file paths across operating systems, and `http` serves the content to users.

### Sample Code

```javascript
// CommonJS: math.js
module.exports = {
  add: (a, b) => a + b,
};

// CommonJS: main.js
const math = require("./math");
console.log(math.add(2, 3)); // Output: 5

// ES Module: math.mjs
export const add = (a, b) => a + b;

// ES Module: main.mjs
import { add } from "./math.mjs";
console.log(add(2, 3)); // Output: 5

// Built-in module example
const path = require("path");
console.log(path.join(__dirname, "files", "data.txt")); // Resolves file path
```

**Explanation**: CommonJS and ES Modules allow modular code. Built-in `path` ensures cross-platform compatibility for file paths.

---

## 3. Event Emitter

### Explanation

The `events` module enables custom event handling through the `EventEmitter` class. You can create, emit, and listen for custom events, making it ideal for asynchronous communication within an application.

### Real-Time Use Case

In a real-time notification system (e.g., a delivery app), `EventEmitter` can trigger events when a delivery status changes, notifying users instantly.

### Sample Code

```javascript
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Event listener
myEmitter.on("orderPlaced", (orderId) => {
  console.log(`Order ${orderId} placed successfully!`);
});

// Emit event
myEmitter.emit("orderPlaced", "12345");
```

**Explanation**: The `orderPlaced` event is defined and triggered, allowing decoupled components to react to order updates.

---

## 4. Global Objects

### Explanation

Node.js provides global objects like `process` (runtime environment info), `Buffer` (handles binary data), `__dirname` (current directory path), and `__filename` (current file path). These are accessible without imports and are crucial for configuration and file handling.

### Real-Time Use Case

In a logging system, `process.env` retrieves environment variables (e.g., API keys), and `__dirname` ensures correct file paths for log storage.

### Sample Code

```javascript
// Environment variables
console.log(process.env.NODE_ENV); // e.g., 'development'

// Buffer for binary data
const buffer = Buffer.from("Hello");
console.log(buffer.toString("hex")); // Converts to hexadecimal

// File paths
console.log(__dirname); // Directory of current script
console.log(__filename); // Full path of current script
```

**Explanation**: `process.env` accesses configuration, `Buffer` handles binary data (e.g., image processing), and `__dirname`/`__filename` ensure correct file paths.

---

## 5. Error Handling

### Explanation

Node.js handles **synchronous errors** with try-catch and **asynchronous errors** via callbacks, Promises, or `async/await`. The `process.on('uncaughtException')` event catches unhandled errors to prevent crashes, though it’s a last resort.

### Real-Time Use Case

In an e-commerce API, error handling ensures that database connection failures or invalid inputs return meaningful responses (e.g., 500 or 400 status codes) instead of crashing the server.

### Sample Code

```javascript
// Synchronous error
try {
  throw new Error("Synchronous error");
} catch (err) {
  console.error(err.message);
}

// Asynchronous error with async/await
async function fetchData() {
  try {
    throw new Error("Async error");
  } catch (err) {
    console.error(err.message);
  }
}
fetchData();

// Uncaught exception handler
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});
```

**Explanation**: Try-catch handles synchronous errors, `async/await` manages async errors, and `uncaughtException` prevents crashes from unhandled errors.

---

## 6. Streams

### Explanation

Streams process data in chunks, ideal for handling large files or network data. Types include **Readable**, **Writable**, **Duplex**, and **Transform**. **Piping** connects streams (e.g., reading from a file and writing to another).

### Real-Time Use Case

In a video streaming service, streams deliver video chunks to users, reducing memory usage compared to loading the entire file.

### Sample Code

```javascript
const fs = require("fs");

// Create a readable stream and pipe to a writable stream
const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);
console.log("File copied via streams");
```

**Explanation**: The `pipe` method streams data from `input.txt` to `output.txt`, processing it in chunks to save memory.

---

## 7. File System

### Explanation

The `fs` module provides synchronous (`fs.readFileSync`) and asynchronous (`fs.readFile`) methods for file operations like reading, writing, or deleting files. Asynchronous methods are preferred to avoid blocking the event loop.

### Real-Time Use Case

In a content management system, the `fs` module reads HTML templates or writes user-uploaded files (e.g., images) to the server.

### Sample Code

```javascript
const fs = require("fs");

// Asynchronous read
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) console.error(err);
  console.log(data);
});

// Synchronous write
fs.writeFileSync("output.txt", "Hello, Node.js!");
console.log("File written synchronously");
```

**Explanation**: Asynchronous `readFile` prevents blocking, while synchronous `writeFileSync` is simpler but blocks the event loop.

---

## 8. Clustering

### Explanation

The `cluster` module allows Node.js to utilize multiple CPU cores by forking worker processes. The master process distributes tasks to workers, improving performance for CPU-intensive tasks.

### Real-Time Use Case

In a high-traffic API server (e.g., an e-commerce platform), clustering distributes incoming requests across multiple workers to handle load efficiently.

### Sample Code

```javascript
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Create worker processes
  }
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Worker ${process.pid} handled request`);
    })
    .listen(3000);
  console.log(`Worker ${process.pid} started`);
}
```

**Explanation**: The master process forks workers equal to CPU cores, and each worker runs an HTTP server, balancing load.

---

## 9. Performance Optimization

### Explanation

**Avoiding event loop blocking** involves using asynchronous operations for I/O tasks. **Worker threads** (via `worker_threads` module) handle CPU-intensive tasks (e.g., image processing) without blocking the main thread.

### Real-Time Use Case

In a photo-sharing app, worker threads resize uploaded images, while the main thread continues handling user requests.

### Sample Code

```javascript
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (msg) => console.log(msg));
} else {
  // Simulate CPU-intensive task
  let result = 0;
  for (let i = 0; i < 1e9; i++) result += i;
  parentPort.postMessage(`Result: ${result}`);
}
```

**Explanation**: The worker thread performs a CPU-intensive calculation, freeing the main thread for other tasks.

---

## 10. Security

### Explanation

Security practices include avoiding `eval` or similar functions to prevent code injection, sanitizing user inputs to prevent attacks like XSS, and using `process.env` for sensitive data (e.g., API keys) via environment variables.

### Real-Time Use Case

In a payment processing API, environment variables store database credentials, and input sanitization prevents SQL injection.

### Sample Code

```javascript
require("dotenv").config();
const express = require("express");
const app = express();

// Access environment variable
const dbPassword = process.env.DB_PASSWORD;
console.log(`Database Password: ${dbPassword}`);

// Input sanitization (basic example)
app.get("/user", (req, res) => {
  const userInput = req.query.name;
  // Simple sanitization (use libraries like express-validator in production)
  if (/^[a-zA-Z0-9]+$/.test(userInput)) {
    res.send(`Hello, ${userInput}`);
  } else {
    res.status(400).send("Invalid input");
  }
});

app.listen(3000);
```

**Explanation**: `dotenv` loads environment variables, and input validation ensures only alphanumeric names are accepted, reducing injection risks.

---

## How to Use This Guide

- **Practice**: Run each code snippet in a Node.js environment to understand behavior.
- **Projects**: Build a small API or file-processing app incorporating these concepts.
- **Interview Prep**: Be ready to explain the event loop, streams, or clustering in interviews, using these examples as a reference.
