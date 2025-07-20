"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 青龙脚本任务
 * cron: 7 9 * * *
 */
const axios_1 = __importDefault(require("axios"));

/*
const url = 'https://www.pttime.org/attendance.php';
*/
const url = 'https://rousi.zip/attendance.php'
async function main() {
    console.log('开始...');
    const { data } = await axios_1.default.get(url, {
        headers: {
            cookie: process.env.ROUSI_COOKIE,
        },
    });
    if (data.includes('<title>PTT :: 登录 - Powered by NexusPHP</title>')) {
        QLAPI.notify('rousi', '签到失败：登录已经过期');
        throw new Error('签到失败：登录已经过期');
    }
    if (!data.includes('<title>PTT :: 签到 - Powered by NexusPHP</title>')) {
        QLAPI.notify('rousi', `签到失败：${data}`);
        throw new Error(`签到失败：${data}`);
    }
    QLAPI.notify('rousi', '签到成功');
    console.log('签到成功');
}
main();
