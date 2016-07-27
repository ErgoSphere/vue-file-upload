<template>
  <div id="app">
    <h1>Upload your files here.</h1>
    <file-upload
      :debug="true"
      :upload-options="uploadOptions"
      upload-endpoint="https://api.imgur.com/3/image"
      file-key="image"
      class="my-uploader"></file-upload>
  </div>
</template>

<script>
import FileUpload from './components/FileUpload'

export default {
  data () {
    return {
      uploadOptions: {
        headers: {
          Authorization: 'Client-ID YOURIMGURIDHERE'
        }
      }
    }
  },
  components: {
    FileUpload
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
  max-width: 40em;
  margin: auto;
  display: block;
  color: #33383D;
}
.my-uploader {
  text-align: center;
  background: #eee;
  border: 3px dashed #888;
  padding: 2em;
  border-radius: 0.5em;
}
.my-uploader.dragging-over {
  background: yellow;
}
.my-uploader .uploading-file {
  position: relative;
  text-align: center;
}
.my-uploader .uploading-file progress {
  display: block;
  width: 100%;
  margin: auto;
}
.my-uploader .uploading-file .name:after {
  font-style: italic;
  opacity: 0.5;
}
.my-uploader .uploading-file.incomplete .name:after {
  content: ' (incomplete)';
}
.my-uploader .uploading-file.complete .name:after {
  content: ' (complete)';
}
.my-uploader .uploading-file.error .name:after {
  content: ' (error)';
}
</style>
