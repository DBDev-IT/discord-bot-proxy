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
    const method = req.method;
    const body = req.body ? JSON.parse(req.body) : null;

    if (!endpoint) {
        return res.status(400).json({error: "Missing endpoint parameter"});
    }

    if (!token) {
        return res.status(400).json({error: "Missing token parameter"});
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
