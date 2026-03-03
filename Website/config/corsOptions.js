const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://abd0selim.alwaysdata.net",
  "file://",
  "null",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("🚨 CORS Blocked This Origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
