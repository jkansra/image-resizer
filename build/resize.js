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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage = (fileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const originalPath = path_1.default.join(__dirname, `../assets/full/${fileName}.jpeg`);
        const resizedPath = path_1.default.join(__dirname, `../assets/thumb/${fileName}-${width}-${height}.jpeg`);
        if (!fs_1.default.existsSync(originalPath)) {
            return 'No file exists with this name';
        }
        // Update image if different dimensions are passed for same image
        // Fetching dimensions using image-size package
        if (fs_1.default.existsSync(resizedPath)) {
            console.log('Resized File Already Exists');
            return resizedPath;
        }
        yield (0, sharp_1.default)(originalPath).resize(width, height).toFile(resizedPath);
        console.log('File Created Successfully!');
        return resizedPath;
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = resizeImage;
