"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
class RegisterUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(dto) {
        var _a;
        const existing = await this.repository.findByEmail(dto.email);
        if (existing)
            throw new Error('Email ya registrado');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const now = new Date();
        const user = new user_entity_1.User((0, uuid_1.v4)(), dto.name, dto.email, hashedPassword, (_a = dto.role) !== null && _a !== void 0 ? _a : 'CLIENT', // ← usa el rol si viene, o 'CLIENT' por default
        now);
        return this.repository.create({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
