type Handler = () => void;

const startHandler: Handler = () => {};

export const handlers: Record<string, Handler> = {
  start: startHandler,
};
