import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient } from "@tanstack/react-query";

export const config = getDefaultConfig({
    appName: 'dtrainings-ui',
    projectId: '7d94851fd3b42ce8f2760c7158a8b64f',
    chains: [mainnet, sepolia],
    ssr: false
})

const queryClient = new QueryClient();

export default { config };
export { queryClient };