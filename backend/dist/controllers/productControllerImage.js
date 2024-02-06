"use strict";
// entryController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntries = exports.addEntry = void 0;
const firebase_1 = require("../firebase/firebase");
const addEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, image } = req.body;
    try {
        const entry = firebase_1.db.collection('Product').doc();
        const entryObject = {
            id: _id,
            image
        };
        entry.set(entryObject);
        res.status(200).send({
            status: 'success',
            message: 'entry added successfully',
            data: entryObject
        });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.addEntry = addEntry;
const getAllEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEntries = [];
        const querySnapshot = yield firebase_1.db.collection('Product').get();
        querySnapshot.forEach((doc) => allEntries.push(doc.data()));
        return res.status(200).json(allEntries);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAllEntries = getAllEntries;
