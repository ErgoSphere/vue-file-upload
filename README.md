# vue-file-upload

> A drag and drop (with fallback) file uploader component for Vue.js

## Usage

```bash
npm install vue-file-upload
```

```html
<template>
    <div>
        <file-upload
            upload-endpoint="https://api.imgur.com/3/image"
            file-key="image"></file-upload>
    </div>
</template>
```

```javascript
import FileUpload from 'vue-file-upload'
export default {
    components: { FileUpload }
}
```

## Available Properties

To come...

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
