Viiniviikari Mobile App
===

## Dev installation
Clone the directory and move into it.

```
git clone https://github.com/JoelLappalainen/viiniviikari-mobile.git
cd viiniviikari-mobile
```

---

**Install Grunt.**
```
npm install -g grunt
npm install -g grunt-cli
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

**Rollback to cordova 5.0.0**

```sudo npm install -g cordova@5.0.0```
This fixes some ng-animate issues...

---

**Fix Grunt.**

```
sudo npm uninstall grunt-concurrent
sudo npm install grunt-concurrent@1.0.0
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
Choose for example 'localhost'


```
grunt serve
```
---

# Deploying to device

**(Android)**
Note that you have to install android SDK
and add some stuff to $PATH variable...
```
cordova platform add android
ionic build android
ionic run android
```

**(IOS)**
IOS requires you to have Apple Developer program.
However you can use a simulator to run your app

```
npm install ios-sim -g
cordova platform add ios
ionic build ios
ionic run ios
```




