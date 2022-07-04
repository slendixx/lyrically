import { Router } from "express";
const router = Router({ mergeParams: true });

router.route("/lyrics").get();

export default router;
