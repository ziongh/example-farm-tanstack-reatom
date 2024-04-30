import { connectLogger, createCtx } from '@reatom/framework';

const globalCtx = createCtx();
connectLogger(globalCtx);

export { globalCtx };
