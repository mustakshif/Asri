import { environment as env } from "./rsc";

export const remote = (env.isInBrowser || env.isMobile) ? null : require("@electron/remote");