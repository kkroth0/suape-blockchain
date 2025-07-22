"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
router.post('/', eventController_1.createEvent);
router.get('/', eventController_1.getEvents);
exports.default = router;
