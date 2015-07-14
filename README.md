# viiniviikari-mobile
A mobile application for wine enthusiasts.
===


**Install Grunt.**
```
sudo npm install -g grunt
```

**NOTE:** global install with sudo may require fix (Mac OSX especially?) described here: http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo - execute commands:
```
sudo chown -R $(whoami) ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

---

**Install npm and bower packages.**

```
npm install && bower install
```

---

**Fix Grunt.**

```
sudo npm uninstall grunt-concurrent
sudo npm install grunt-concurrent@1.0.0
```

Also this (is required?).
```
npm install -g grunt-cli
```

---

**Install Compass** (requires Ruby and Ruby-gem [included in Ubuntu]).
```
sudo gem install compass
```

---

**Serve the code**

First time running the code start with Ionic to choose preffered address (tested with option 'localhost')
```
ionic address
```
choose 'localhost'

Stop ionic `CTRL+C` and continue with Grunt.

```
grunt serve
```




