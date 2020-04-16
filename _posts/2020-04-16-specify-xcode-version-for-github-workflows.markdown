---
title: Specify XCode version for GitHub workflows
layout: post
category: swift
desc: The build process on GitHub failed when I used the XCTUnwrap function. This feature was added in XCode 11. I updated the workflows yml file to specify the XCode version.
excerpt_separator: <!--more-->
---

I wrote a unit test that used the [XCTUnwrap](https://developer.apple.com/documentation/xctest/3380195-xctunwrap) function. This feature was added in XCode 11 and 

> "Asserts that an expression is not nil and returns the unwrapped value." 

However, when I pushed my code to GitHub, the build broke with the following error.

> error: use of unresolved identifier 'XCTUnwrap'

<!--more-->

To fix this I updated my `.github/workflows/swift.yml` file to include the XCode version.  I found the solution from [this GitHub Community Forum Post](https://github.community/t5/GitHub-Actions/Selecting-an-Xcode-version/m-p/31105). You can specify the version in the `env` using the `DEVELOPER_DIR` tag. GitHub maintains a list of available XCode versions [here.](https://github.com/actions/virtual-environments/blob/master/images/macos/macos-10.15-Readme.md#xcode)


Here is what my `swift.yml` file looks like. This is for a swift package that is included in other iOS projects.


```yml
name: Swift

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
env:
  DEVELOPER_DIR: /Applications/Xcode_11.4.app/Contents/Developer

jobs:
  build:

    runs-on: macos-latest

    steps:
    - uses: actions/checkout@v2
    - name: Build
      run: swift build -v
    - name: Run tests
      run: swift test -v
```
