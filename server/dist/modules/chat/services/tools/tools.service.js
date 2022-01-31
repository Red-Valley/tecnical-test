"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
let ToolsService = class ToolsService {
    constructor() { }
    dateToMySQL(fechaR) {
        let fecha = fechaR.toJSON();
        let fechaStr = fecha.replace('T', ' ').substring(0, 19);
        return fechaStr;
    }
    async encriptHash(hash, salt) {
        let promise = new Promise((resolve, reject) => {
            (0, crypto_1.pbkdf2)(hash, salt, 10000, 64, 'sha512', (err, derivedKey) => {
                if (err)
                    throw err;
                let newhash = derivedKey.toString('hex');
                resolve(newhash);
            });
        });
        return promise;
    }
    async checkHash(attemp, hash, salt) {
        let promise = new Promise(async (resolve, reject) => {
            let hashEncrypted = await this.encriptHash(attemp, salt).then();
            resolve(hashEncrypted === hash);
        });
        return promise;
    }
    async createSalt() {
        let promise = new Promise((resolve, reject) => {
            let salt = (0, crypto_1.randomBytes)(128).toString('base64');
            resolve(salt);
        });
        return promise;
    }
    async createUUID() {
        let promise = new Promise((resolve, reject) => {
            let code = (0, uuid_1.v4)();
            resolve(code);
        });
        return promise;
    }
};
ToolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ToolsService);
exports.ToolsService = ToolsService;
//# sourceMappingURL=tools.service.js.map