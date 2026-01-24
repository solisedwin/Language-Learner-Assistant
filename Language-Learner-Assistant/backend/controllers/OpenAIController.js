"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTextResponse = void 0;
var OpenAIService_ts_1 = require("../services/OpenAIService.ts");
var secretKey = process.env.OPENAI_SECRET_KEY || '';
console.log(process.env);
var openAIService = new OpenAIService_ts_1.OpenAIService(secretKey);
var generateTextResponse = function (req, res) {
    res.send('Get OpenAI Response');
    /*
    openAIService.generateTextResponse('')
    .then(responseText => {
        res.json({ text: responseText });
        
    });
    */
};
exports.generateTextResponse = generateTextResponse;
