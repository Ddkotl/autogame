import { SocksProxyAgent } from "socks-proxy-agent";

const SOCKS_PROXY = "socks5h://127.0.0.1:9050";
export const socksAgent = new SocksProxyAgent(SOCKS_PROXY);
