<!-- Project Header -->
<div align="center"> 
  <h1 class="projectName">NoBS - Node Build Script</h1>

  <p class="projectBadges">
    <img src="https://img.shields.io/badge/type-Node.js_Module-4caf50.svg" alt="Project type" title="Project type">
    <img src="https://img.shields.io/github/languages/top/jerboa88/NoBS.svg" alt="Language" title="Language">
    <img src="https://img.shields.io/github/repo-size/jerboa88/NoBS.svg" alt="Repository size" title="Repository size">
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/jerboa88/NoBS.svg" alt="Project license" title="Project license"/>
    </a>
  </p>
  
  <p class="projectDesc" data-exposition="An experimental build task runner for Node.js that allows you to schedule tasks to be run either sequentially or concurrently using a simple array-based config object. Created as a way to explore build optimization using JavaScript promises.">
    A dead simple build task runner for Node.js.<br/><br/>
	Automate your build process by scheduling build tasks to be run either sequentially or concurrently using a simple array-based config object.
  </p>
  
  <br/>
</div>


> This is an experimental project and there are likely a lot of bugs to be ironed out. I would recommend [Gulp](https://gulpjs.com/) as a more powerful, fleshed out alternative


## Installation
Install with `npm install git+https://github.com/jerboa88/NoBS.git` for the latest version. The project is not on NPM at this time.


## Usage

1. Import the module with:
```Javascript
const NoBS = require('NoBS');
```

2. Create an array of tasks:
```Javascript
const taskList = [
	[taskA1, taskA2],
	[taskB1],
	[taskC1, taskC2, taskC3]
];
```

**Tasks** are simply functions which return a promise. Tasks are contained in **stages**, which are the sub-arrays shown here.
Every task in a stage will be started at the same time, and once all tasks in a stage are complete, the next stage will start.
Note that this cannot be nested any further.

3. (Optional) Define additional options:
```Javascript
const options = {
	taskSuccessCallback: taskSuccessCallback,
	taskErrorCallback: taskErrorCallback,
	debug: true
}
```

Any of these properties can be left out if not required.

`taskSuccessCallback` and `taskErrorCallback` are callback functions that are fired each time a task completes or fails, respectively. They should each accept three arguments:
- `taskName`: The function name of a task
- `result/error`: The value passed to `resolve()` or `reject()` when a task finishes. Since you write the task functions, this can be whatever you want
- `stageHasError`: Whether an error has been encountered while running any tasks in this stage. We will wait for all tasks in a stage to complete even if there is an error, so this can be used to filter out duplicate error messages, for example

`debug` controls whether debug messages are printed to the console.


3. Create a NoBS object with:
```Javascript
const noBS = new NoBS(taskList, options);
```

Note that `options` is not required here.

4. Run tasks with NoBS:
```Javascript
noBS.run()
	.then(result => console.log('Done'))
	.catch(error => console.error(`Error: ${error}`));
```

---

Please see [test.js](test.js) for a complete example.


## Contributing
This is an experimental project but input is welcome :). [SemVer](http://semver.org/) is used for versioning.


## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
