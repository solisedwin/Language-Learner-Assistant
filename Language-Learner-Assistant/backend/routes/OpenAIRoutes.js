"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OpenAIController_ts_1 = require("../controllers/OpenAIController.ts");
var router = (0, express_1.Router)();
router.post('/', OpenAIController_ts_1.generateTextResponse);
exports.default = router;
