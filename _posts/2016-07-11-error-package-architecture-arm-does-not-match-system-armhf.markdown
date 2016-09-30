---
title: Error&#58; package architecture (arm) does not match system (armhf)
layout: post
category: raspberrypi
desc: What does arm and armhf mean?  And what does the error "package architecture (arm) does not match system (armhf)" mean?
excerpt_separator: <!--more-->
---

I installed a beta version of a Debian package on my [Raspberry Pi 3](https://www.raspberrypi.org/magpi/raspberry-pi-3-specs-benchmarks/) and received the following error:

```
dpkg: error processing archive remote-syslog2_0.18_arm.deb (--install):
package architecture (arm) does not match system (armhf)
Errors were encountered while processing:
remote-syslog2_0.18_arm.deb
```

The [suggested solution](https://github.com/papertrail/remote_syslog2/issues/109#issuecomment-225245986) was to add the <code>arm</code> architecture as follows: 

```
dpkg --add-architecture arm
```

and then re-run the install command:

```
dpkg -i remote-syslog2_0.18_arm.deb
```

I did so and the package installed and worked as expected.  However, this made me wonder:

- What did the <code>dpkg --add-architecture arm</code> command do? 
- What were the consequences of running that command?

After several hours of reading, experimenting and writing this blog post, I _think_ I know.  I'll start by breaking the command down.

<!--more-->

<div class="alert alert-info">
  <strong>Note:</strong> The above solution was a work around while the package was in development. The production version is compiled for the armhf architecture.
</div>

## dpkg

<code>dpkg</code> is a command line tool for managing Debian packages. To install a package, the <code>dpkg</code> tool needs to recognize that package's architecture.  Supported architectures are in the <code>/var/lib/dpkg/arch</code> file. The following commands display information about the architecture(s) <code>dpkg</code> supports:

- <code>dpkg --print-architecture</code> will display the current machine architecture.  There will always be one current machine architecture. It cannot be removed. 
- <code>dpkg --print-foreign-architectures</code> will list any architectures that have been added to <code>dpkg</code>.  Foreign architectures can be added and removed. 
- <code>dpkg -I package_name.deb</code> will display information about a .deb archive. The architecture of a package will be listed in the 'Architecture' field.

<img src="/images/dpkg.png" class="img-responsive center-block" alt="output of various dpkg commands">

In the above screenshot the <code>dpkg --print-foreign-architectures</code> command returns nothing because a foreign architecture has not yet been added.

## Add architecture

Architecture in this scenario refers to an [Application Binary Interface](#application-binary-interface). There are two ways to install a package that does not match the current architecture:

- <code>dpkg --add-architecture arch_name</code> - adds the given architecture to the list of architectures <code>dpkg</code> will process.  After running this command do an <code>apt-get update</code> to update the available package lists. If you get errors see the [errors section](#errors-from-adding-the-new-architecture) below. Note: running the <code>add-architecture</code> command does not alter the computer's architecture. It only tells the <code>dpkg</code> tool which architectures it will process.


<img src="/images/dpkg-add-architecture.png" class="img-responsive center-block" alt="output of add architecture">

- <code>dpkg --force architecture -i package_name.deb</code> - installs a Debian package with no architecture or an architecture that does not match the machine's architecture.  The foreign architecture is not added to the list of architectures that <code>dpkg</code> maintains.

<img src="/images/dpkg-force-architecture.png" class="img-responsive center-block" alt="output of force architecture">


## Application Binary Interface

<code>arm</code> is the name of the Debian ABI for the ARM architecture.  ABI, or Application Binary Interface, is a low level interface. It defines how software interacts with each other on a given architecture. From [Linux System Programming](https://www.safaribooksonline.com/library/view/linux-system-programming/9781449341527/ch01.html#abis):


> &hellip; an ABI defines the binary interface between two or more pieces of software on a particular architecture. It defines how an application interacts with itself, how an application interacts with the kernel, and how an application interacts with libraries. Whereas an API ensures source compatibility, an ABI ensures binary compatibility, guaranteeing that a piece of object code will function on any system with the same ABI, without requiring recompilation.

> The ABI is intimately tied to the architecture; the vast majority of an ABI speaks of machine-specific concepts, such as particular registers or assembly instructions. Thus, each machine architecture has its own ABI on Linux. In fact, we tend to call a particular ABI by its machine name, such as Alpha, or x86-64. Thus, the ABI is a function of both the operating system (say, Linux) and the architecture (say, x86-64).

<code>arm</code> is the original Debian port of the arm-linux ABI. It is now considered obsolete and newer ports such as [armel](https://wiki.debian.org/ArmEabiPort) and [armhf](https://wiki.debian.org/ArmHardFloatPort) have replaced it. <code>armel</code> is the default Debain port for the ARM architecture.  <code>armhf</code> is a port that uses the "hard" [Floating Point Unit](https://en.wikipedia.org/wiki/Floating-point_unit). This means a hardware unit, as opposed to software, performs floating point calculations.  

## Remove architecture

First remove any packages that use the architecture. There are two options to remove the packages:

- <code>apt-get remove ".*:arm"</code> - This will remove all <code>arm</code> packages but will leave configuration files.
- <code>apt-get purge ".*:arm"</code> - This will remove all <code>arm </code> packages plus their configuration files.

Next, use the <code>dpkg --remove-architecture arch_name</code> command to remove the architecture.

Note: the following error will occur if any packages of the given architecture exist:

```
dpkg: error: cannot remove architecture 'arm' currently in use by the database
```

The screenshot below shows the errors and results from removing the <code>arm</code> architecture:

<img src="/images/dpkg-remove-architecture1.png" class="img-responsive center-block" alt="output from remove architecture when packages of that architecture are present">

After choosing 'Y' at the prompt, the package is removed. Now the<code>arm</code> architecture can be removed successfully:

<img src="/images/dpkg-remove-architecture2.png" class="img-responsive center-block" alt="output from successfully running remove architecture command">

## Errors from adding the new architecture

One of the questions I had was if there were any consequences from adding the <code>arm</code> architecture. The answer is 'yes'. I received the following error when I attempted to update my Raspberry Pi using the <code>sudo apt-get update</code> command:

```
Error:
Hit http://archive.raspberrypi.org jessie InRelease
Hit http://mirrordirector.raspbian.org jessie InRelease
W: Failed to fetch http://mirrordirector.raspbian.org/raspbian/dists/jessie/InRelease  Unable to find expected entry 'main/binary-arm/Packages' in Release file (Wrong sources.list entry or malformed file)

W: Failed to fetch http://archive.raspberrypi.org/debian/dists/jessie/InRelease  Unable to find expected entry 'main/binary-arm/Packages' in Release file (Wrong sources.list entry or malformed file)

E: Some index files failed to download. They have been ignored, or old ones used instead.
```

This error occurred because <code>apt-get</code> tried to get <code>arm</code> packages that do not exist. To resolve this I specified it to only get <code>armhf</code> packages.  I did this by modifying the following two files:

- /etc/apt/sources.list.d/raspi.list
- /etc/apt/sources.list

In each file I added [arch=armhf] to the listing. 

/etc/apt/sources.list.d/raspi.list

```
deb [ arch=armhf ] http://archive.raspberrypi.org/debian/ jessie main ui
```

/etc/apt/sources.list

```
deb [arch=armhf] http://mirrordirector.raspbian.org/raspbian/ jessie main contrib non-free rpi
```

In the following screenshot the first file in the <code>diff</code> command contains the modification I made and the second file is the original file.


<img src="/images/changes-to-apt-sources.png" class="img-responsive center-block" alt="output from diff command on the changed and original sources files">

I discovered one side effect from adding a new architecture, but are there any more? One possibility is the package may not work if it depends on specific architecture attributes. In my case the package worked, but others may not.

## Conclusion

When faced with installing a package that uses a different architecture:

1. First ask if the package can be compiled for the computer's architecture.  This is the preferred solution.
1. If compiling for your architecture is not possible then first try force architecture. 
1. If that does not work then try add architecture. 

Wow! I learned a lot! It is amazing what lies beneath one command. 

## References:

- [https://wiki.debian.org/Multiarch/HOWTO](https://wiki.debian.org/Multiarch/HOWTO)
- [http://man7.org/linux/man-pages/man1/dpkg.1.html](http://man7.org/linux/man-pages/man1/dpkg.1.html)
- [http://superuser.com/questions/714391/how-do-i-remove-all-i386-architecture-packages-from-my-debian-installation](http://superuser.com/questions/714391/how-do-i-remove-all-i386-architecture-packages-from-my-debian-installation)
- [https://debian-handbook.info/browse/stable/sect.manipulating-packages-with-dpkg.html](https://debian-handbook.info/browse/stable/sect.manipulating-packages-with-dpkg.html)
- [https://www.safaribooksonline.com/library/view/linux-system-programming/9781449341527/ch01.html#abis](https://www.safaribooksonline.com/library/view/linux-system-programming/9781449341527/ch01.html#abis)
