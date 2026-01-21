import express from "express";
import cors from "cors";
const app = express();

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
));

app.get("/req", async (req, res) => {
    const endpoint = req.query.endpoint;
    const token = req.query.token;
    const method = req.query.method || "GET";
    const body = req.query.body ? JSON.parse(req.query.body) : null;

    if (!endpoint) {
        return res.status(400).json({error: "Missing endpoint parameter"});
    }

    if (!token) {
        return res.status(400).json({error: "Missing token parameter"});
    }

    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE" && method !== "PATCH") {
        return res.status(400).json({error: "Invalid method parameter"});
    }

    try {
        const response = await fetch(`https://discord.com/api/v10/${endpoint}`, {
            method,
            headers: {
                Authorization: `Bot ${token}`,
                "Content-Type": "application/json"
            },
            body
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data"});
    }
});
export default app;
