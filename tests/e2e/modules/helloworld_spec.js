const helpers = require("../global-setup");

const describe = global.describe;
const it = global.it;
const beforeEach = global.beforeEach;
const afterEach = global.afterEach;

describe("Test helloworld module", function () {
	helpers.setupTimeout(this);

	let app = null;

	beforeEach(function () {
		return helpers
			.startApplication({
				args: ["js/electron.js"]
			})
			.then(function (startedApp) {
				app = startedApp;
			});
	});

	afterEach(function () {
		return helpers.stopApplication(app);
	});

	describe("helloworld set config text", function () {
		beforeAll(function () {
			// Set config sample for use in test
			process.env.MM_CONFIG_FILE = "tests/configs/modules/helloworld/helloworld.js";
		});

		it("Test message helloworld module", async function () {
			const elem = await app.client.$("helloworld");
			return (elem.getText(".helloworld") === "Test HelloWorld Module");
		});
	});

	describe("helloworld default config text", function () {
		beforeAll(function () {
			// Set config sample for use in test
			process.env.MM_CONFIG_FILE = "tests/configs/modules/helloworld/helloworld_default.js";
		});

		it("Test message helloworld module", async function () {
			const elem = await app.client.$("helloworld");
			return (elem.getText(".helloworld") === "Hello World!");
		});
	});
});
