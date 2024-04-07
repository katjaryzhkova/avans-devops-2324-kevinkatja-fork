const io = require("socket.io")();
const { db } = require("./database");
const Request = require("./messageQueue");

const socket = {
    io
};

io.on("connection", function(socket) {
    let user_id = null;
    let user_name = null;

    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("identify", async (name) => {
        console.log(`${user_name == null ? "an anonymous user" : user_name} changed identity to ${name}`);

        const request = new Request("userQueue");
        await request.connect();
        request.request({
            name
        });

        user_id = (await request.response()).id;

        user_name = name;
    });

    socket.on("reset_identity", () => {
        console.log("a user reset their identity");

        user_id = null;
        user_name = null;
    });

    socket.on("chat message", (msg) => {
        console.log(`${user_name == null ? "anonymous" : user_name}: ` + msg);

        db.collection("chatlog").insertOne({
            sender: user_id,
            message: msg,
            timestamp: Date.now()
        });

        io.emit("chat message", msg, user_name || "anonymous");
    });
});

module.exports = socket;
