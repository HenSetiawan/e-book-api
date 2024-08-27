import express from 'express'
const apiRoute = express.Router();

import userRoute from "./user.js";
import roleRoute from "./role.js";
import authRoute from "./auth.js";
import nationalityRoute from "./nationality.js";
import authorRoute from "./author.js";
import languageRoute from "./language.js";
import bookRoute from "./book.js";
import genreRoute from './genre.js';

apiRoute.use("/api/v1", userRoute);
apiRoute.use("/api/v1", roleRoute);
apiRoute.use("/api/v1", authRoute);
apiRoute.use("/api/v1", nationalityRoute);
apiRoute.use("/api/v1", authorRoute);
apiRoute.use("/api/v1", languageRoute);
apiRoute.use("/api/v1", bookRoute);
apiRoute.use("/api/v1", genreRoute);

export default apiRoute;