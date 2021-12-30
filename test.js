const NoBS = require('./index.js');

const taskA1 = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			resolve('Some result');
		}, 500);
	});
};

const taskA2 = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			resolve('Some result');
		}, 500);
	});
};

const taskB1 = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			resolve('Some result');
		}, 500);
	});
};

const taskC1 = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			reject('Some result');
		}, 500);
	});
};

const taskC2 = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			resolve('Some result');
		}, 500);
	});
};

const taskC3 = async () => {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			resolve('Some result');
		}, 500);
	});
};

const taskList = [
	[taskA1, taskA2],
	[taskB1],
	[taskC1, taskC2, taskC3]
];

const taskSuccessCallback = (taskName, result, stageHasError) => {
	if (!stageHasError) {
		console.log(`CC Task '${taskName}' completed successfully with the following result: ${result}`);
	}
}

const taskErrorCallback = (taskName, error, stageHasError) => {
	console.error(`CC Task '${taskName}' failed with the following error:\n${error}`);
}

const options = {
	taskSuccessCallback: taskSuccessCallback,
	taskErrorCallback: taskErrorCallback,
	debug: true
}


// Use default parameters
const noBS = new NoBS(taskList);

noBS.run()
	.then(result => console.log('Done'))
	.catch(error => console.error(`Error: ${error}`));


// Use custom callbacks and enable debug messages
const noBSWithOptions = new NoBS(taskList, options);

noBSWithOptions.run()
	.then(result => console.log('Done'))
	.catch(error => console.error(`Error: ${error}`));
