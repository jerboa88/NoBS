module.exports = class NoBS {
	#taskList;
	#taskSuccessCallback;
	#taskErrorCallback;
	#debug;

	constructor(taskList, options) {
		this.#taskList = this.#assertTypeEquals(taskList, 'array');
		this.#taskSuccessCallback = this.#getPropertyIfExists(options, 'taskSuccessCallback', 'function', this.#defaultTaskSuccessCallback);
		this.#taskErrorCallback = this.#getPropertyIfExists(options, 'taskErrorCallback', 'function', this.#defaultTaskErrorCallback);
		this.#debug = this.#getPropertyIfExists(options, 'debug', 'boolean', false) ? (msg => {
			console.debug(`DEBUG: ${msg}`);
		}) : (() => { });
	}

	// Return a property if it exists. Otherwise, return a default value that is provided
	#getPropertyIfExists(options, key, type, defaultValue) {
		if (options && key in options) {
			return this.#assertTypeEquals(options[key], type);
		}

		return defaultValue;
	}

	// Ensure the type of a variable matches what is expected
	#assertTypeEquals(variable, type) {
		if ((type === 'array' && Array.isArray(variable)) || typeof variable === type) {
			return variable;
		}

		throw new TypeError('Input does not have the correct type');
	}

	// If the stage already has an error, don't bother printing any more success messages
	#defaultTaskSuccessCallback(taskName, result, stageHasError) {
		if (!stageHasError) {
			console.log(`Task '${taskName}' completed successfully`);
		}
	}

	#defaultTaskErrorCallback(taskName, error, stageHasError) {
		console.error(`Task '${taskName}' failed with the following error:\n${error}`);
	}

	// Manage execution of build tasks
	async run() {
		return new Promise(async (resolve, reject) => {
			this.#debug('Running build tasks');

			const numOfStages = this.#taskList.length;
			let isError = false;
			let i = 0;

			// Wait for each stage to finish, then start the next one
			while (i < numOfStages && !isError) {
				this.#debug(`Running tasks in stage ${i}`);

				try {
					// For all tasks in this stage
					const currentTasks = this.#taskList[i].map(task => {
						// Run the task
						const result = task();

						// Show success/error messages on completion. If there was an error in the meantime, avoid posting additional success messages
						result.then((result) => this.#taskSuccessCallback(task.name, result, isError))
							.catch(error => this.#taskErrorCallback(task.name, error));

						return result;
					});

					// Wait for all tasks in this stage to complete
					await Promise.all(currentTasks);
				} catch (error) {
					// Set a flag when we encounter an error so we can stop execution
					isError = true;
					reject(error);
				}

				++i;
			}

			resolve('All tasks completed successfully');
		});
	}
}
