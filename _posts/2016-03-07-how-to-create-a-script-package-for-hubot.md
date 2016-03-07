---
title: How to create a script package for hubot
layout: post
category: bots
desc: How to create an external script package for hubot
---

I recently created a script package ([hubot-lmgtfy](https://www.npmjs.com/package/hubot-lmgtfy)) for [hubot](https://hubot.github.com/).  This post describes what I did to create the package.


### Step 1: Install grunt (if not installed already)

```Shell
npm install -g grunt-cli
```

Warning: Do NOT use sudo with an npm install.  If you get an EACCES error message saying to rerun as an administrator - DO NOT DO IT. Instead follow the [instructions on the npmjs.com site](https://docs.npmjs.com/getting-started/fixing-npm-permissions) to configure your npm permissions.  The instructions give two options:

1. Change the permissions of npm's default directory
1. Change npm's default directory to another directory

I chose to do option two.

### Step 2: Generate a hubot script package

Follow the [instructions in the hubot documentation](https://hubot.github.com/docs/scripting/#creating-a-script-package) to generate a skeleton script package. You should make the following changes to the generated package.json file:

- Update the repository and bugs urls to your own urls
- Update the version from 0.0.0 to 1.0.0
  - npmjs.com [recommends setting the version to 1.0.0 ](https://docs.npmjs.com/getting-started/semantic-versioning).  I messed up and set my version to 0.1.0.  
  - For more information about semantic versioning see: [http://semver.org/](http://semver.org/).


The package.json changes should include something like the following:

```json
"version": "1.0.0",

"repository": {
    "type": "git",
    "url": "git://github.com/YOUR-USERNAME/hubot-your-script.git"
  },

  "bugs": {
    "url": "https://github.com/YOUR-USERNAME/hubot-your-script/issues"
  },
```


### Step 3: Test your npm package locally

Once you have created your script, you will want to test your package locally.  To do so, you will need to make your package available using the [npm link](https://docs.npmjs.com/cli/link) command. In the root of your package do the following commands:

```Shell
npm install
npm link
```

The npm link command should give you output like the following:

```Shell
/Users/monica/.npm-global/lib/node_modules/hubot-your-script -> /Users/monica/development/hubot-your-script
```

This creates a symbolic link to your script package.

Next, cd to your hubot installation and run the following command

```Shell
npm link hubot-your-script
```

Which should give you output like the following:

```bash
Users/monica/development/myhubot/node_modules/hubot-your-script -> /Users/monica/.npm-global/lib/node_modules/hubot-your-script -> /Users/monica/development/hubot-your-script
```

This creates a symbolic link from the hubot's local node_modules directory to the global symlink created in the step above. **Note:** The script package name you use with this link command should be the name used in your script's package.json file and not the directory name.


Add your package name to your hubot's external-scripts.js file

```json
[
  "hubot-your-script"
]
```

 and run hubot

```Shell
bin/hubot
```

Trying running your new hubot command.  Hopefully it works!


When you are done testing your package locally, unlink it.

In your hubot directory do the following:

```Shell
npm unlink hubot-your-script
```

Next, cd to the root of your hubot's script package and do the following:

```Shell
npm unlink
```


### Step 4: Publish your package

When you are ready to publish your package, you can do so by following the instructions on [npm's site](https://docs.npmjs.com/getting-started/publishing-npm-packages)


