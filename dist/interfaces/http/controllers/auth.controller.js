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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_user_dto_1 = require("../../../application/dtos/register-user.dto");
const login_user_dto_1 = require("../../../application/dtos/login-user.dto");
const register_user_use_case_1 = require("../../../application/use-cases/register-user.use-case");
const login_user_use_case_1 = require("../../../application/use-cases/login-user.use-case");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const user_prisma_repository_1 = require("../../../infrastructure/database/prisma/user.prisma-repository");
const JWT_SECRET = process.env.JWT_SECRET || 'supersecreta';
let AuthController = class AuthController {
    constructor(prisma) {
        this.prisma = prisma;
        const userRepo = new user_prisma_repository_1.UserPrismaRepository(this.prisma);
        this.registerUseCase = new register_user_use_case_1.RegisterUserUseCase(userRepo);
        this.loginUseCase = new login_user_use_case_1.LoginUserUseCase(userRepo, JWT_SECRET);
    }
    async register(dto) {
        const user = await this.registerUseCase.execute(dto);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };
    }
    async login(dto) {
        const result = await this.loginUseCase.execute(dto);
        return result;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthController);
