/**
 * WebRTC 信令服务器
 * 功能：基于路由的房间管理，支持 5 分钟缓存
 * POST /room/:roomId - 添加 data 数据
 * GET /room/:roomId - 获取 data 数据
 */

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.text({ type: '*/*' })); // 接收任意内容为文本

// 内存存储 - 房间数据
const rooms = new Map();

// 缓存时间配置（5 分钟）
const CACHE_TTL = 5 * 60 * 1000;

/**
 * 清理过期房间的定时器
 */
setInterval(() => {
    const now = Date.now();
    for (const [roomId, data] of rooms.entries()) {
        if (now - data.timestamp > CACHE_TTL) {
            rooms.delete(roomId);
            console.log(`房间 ${roomId} 已过期并删除`);
        }
    }
}, 60000); // 每分钟检查一次

/**
 * 生成房间号
 * @returns {string} 房间 ID
 */
function generateRoomId() {
    return uuidv4().split('-')[0];
}

/**
 * 创建或获取房间
 * @param {string} roomId - 房间 ID
 * @returns {Object} 房间对象
 */
function getOrCreateRoom(roomId) {
    let room = rooms.get(roomId);
    if (!room) {
        room = {
            roomId: roomId,
            timestamp: Date.now(),
            data: null
        };
        rooms.set(roomId, room);
    } else {
        room.timestamp = Date.now();
        rooms.set(roomId, room);
    }
    return room;
}

/**
 * 获取房间（如果过期则返回 null）
 * @param {string} roomId - 房间 ID
 * @returns {Object|null} 房间对象或 null
 */
function getRoom(roomId) {
    const room = rooms.get(roomId);
    if (!room) {
        return null;
    }
    
    if (Date.now() - room.timestamp > CACHE_TTL) {
        rooms.delete(roomId);
        return null;
    }
    
    room.timestamp = Date.now();
    rooms.set(roomId, room);
    return room;
}

// 路由：创建新房间
app.post('/room', (req, res) => {
    const roomId = generateRoomId();
    const room = getOrCreateRoom(roomId);
    
    res.json({
        success: true,
        roomId: roomId
    });
});

// 路由：通过房间 ID 添加数据（POST）
app.post('/room/:roomId', (req, res) => {
    const { roomId } = req.params;
    
    const room = getOrCreateRoom(roomId);
    room.data = req.body; // 存储为纯字符串
    rooms.set(roomId, room);
    
    res.send('OK');
});

// 路由：通过房间 ID 获取数据（GET）
app.get('/room/:roomId', (req, res) => {
    const { roomId } = req.params;
    
    const room = getRoom(roomId);
    if (!room) {
        return res.status(404).send('Not Found');
    }
    
    res.send(room.data || '');
});

// 路由：删除所有房间（GET）
app.get('/clear', (req, res) => {
    const count = rooms.size;
    rooms.clear();
    res.json({
        success: true,
        message: `已删除 ${count} 个房间`
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`WebRTC 信令服务器已启动`);
    console.log(`监听端口：${PORT}`);
    console.log(`缓存时间：${CACHE_TTL / 1000}秒`);
    console.log(`\n可用端点:`);
    console.log(`  POST /room - 创建新房间`);
    console.log(`  POST /room/:roomId - 添加数据`);
    console.log(`  GET  /room/:roomId - 获取数据`);
    console.log(`  GET  /clear - 删除所有房间`);
});

module.exports = app;
