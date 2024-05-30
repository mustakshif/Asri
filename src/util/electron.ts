import { environment as env } from "./rsc";

export const remote = (env.isMobile || env.isInBrowser) ? null : require("@electron/remote");