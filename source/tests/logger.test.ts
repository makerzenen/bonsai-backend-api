import logger from "../logger"

describe("source/logger.ts", () => {
  it("should create a valid pino logger", () => {
	logger.info("Testing info.")
	logger.warn("Testing warn.")
	logger.error("Testing error.")
  });
});
