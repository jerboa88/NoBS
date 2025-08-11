<!-- Project Header -->
<div align="center"> 
  <h1 class="projectName">NoBS - Node Build Script</h1>

  <p class="projectBadges info">
    <img src="https://johng.io/badges/category/Library.svg" alt="Project category" title="Project category">
    <img src="https://img.shields.io/github/languages/top/jerboa88/NoBS.svg" alt="Language" title="Language">
    <img src="https://img.shields.io/github/repo-size/jerboa88/NoBS.svg" alt="Repository size" title="Repository size">
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/jerboa88/NoBS.svg" alt="Project license" title="Project license"/>
    </a>
  </p>
  <p class="projectBadges status">
    <a href="https://unmaintained.tech/">
		<img src="https://unmaintained.tech/badge.svg" alt="No Maintenance Intended" title="No Maintenance Intended"/>
	</a>
 	<img src="https://img.shields.io/badge/Experimental-%E2%9A%A0%EF%B8%8E-ca8a04.svg" alt="Experimental" title="Experimental"/>
  </p>
  
  <p class="projectDesc">
    A dead simple build task runner for Node.js.
  </p>
  
  <br/>
</div>


> [!IMPORTANT]
> I've marked this project as [UNMAINTAINED](https://unmaintained.tech/) because it hasn't seen an update in a while. You can still fork/download/use this project at your own risk, but I won't be able to provide support or updates.

> [!WARNING]
> This is currently an experimental project or proof-of-concept. It may contain bugs or incomplete features, and is not intended for production use. Breaking changes may be made at any time. I would recommend [Gulp] as a more powerful, fleshed out alternative.


## 👋 About
Automate your build process by scheduling build tasks to be run either sequentially or concurrently using a simple array-based config object.


## 📦 Installation
Install with `npm install git+https://github.com/jerboa88/NoBS.git` for the latest version. The project is not on NPM at this time.


## 🕹️ Usage

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


## 🤝 Contributing
This is an experimental project but input is welcome :).


## 🧾 License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.


## 🖇️ Related
**[Gulp]**: A toolkit to automate & enhance your workflow. Write individual, focused tasks and compose them into larger operations, providing you with speed and accuracy while reducing repetition.


## 💕 Funding

Find this project useful? [Sponsoring me](https://johng.io/funding) will help me cover costs and **_commit_** more time to open-source.

If you can't donate but still want to contribute, don't worry. There are many other ways to help out, like:

- 📢 reporting (submitting feature requests & bug reports)
- 👨‍💻 coding (implementing features & fixing bugs)
- 📝 writing (documenting & translating)
- 💬 spreading the word
- ⭐ starring the project

I appreciate the support!

[Gulp]: https://gulpjs.com/
