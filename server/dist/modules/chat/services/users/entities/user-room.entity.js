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
exports.UserRoomEntity = void 0;
const typeorm_1 = require("typeorm");
let UserRoomEntity = class UserRoomEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.Column)({
        primary: true,
        type: 'char',
        length: 36,
    }),
    __metadata("design:type", String)
], UserRoomEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserRoomEntity.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserRoomEntity.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserRoomEntity.prototype, "createdAt", void 0);
UserRoomEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users_rooms' })
], UserRoomEntity);
exports.UserRoomEntity = UserRoomEntity;
//# sourceMappingURL=user-room.entity.js.map