"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const resize_1 = __importDefault(require("../resize"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test if the endpoint is running', () => {
    it('gets the api endpoint', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/image-resize');
            expect(response.status).toBe(200);
        });
    });
});
describe('Test if the error message is returned if no query param is sent', () => {
    it('get the error message', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get('/image-resize');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Please enter numeric dimensions');
        });
    });
});
describe('Test if the error message is returned if height/width dimension is less than or equal to zero', () => {
    it('get the error message', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request
                .get('/image-resize')
                .query({ height: 0, width: 0, fileName: 'fjord' });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Please enter valid dimensions');
        });
    });
});
describe('Test success if fileName getting resized first time', () => {
    it('get the error message', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request
                .get('/image-resize')
                .query({ height: 500, width: 500, fileName: 'icelandwaterfall' });
            expect(response.status).toBe(200);
            expect(response.type).toBe('image/jpeg');
        });
    });
});
describe('Test success if image is getting processed', () => {
    it('get the processed image', () => {
        const fileName = "icelandwaterfall";
        const width = 500;
        const height = 500;
        const resizedPath = path_1.default.join(__dirname, `../assets/thumb/${fileName}-${width}-${height}.jpeg`);
        if (fs_1.default.existsSync(resizedPath)) {
            fs_1.default.unlinkSync(resizedPath);
        }
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, resize_1.default)(fileName, width, height);
        })).not.toThrow();
    });
});
