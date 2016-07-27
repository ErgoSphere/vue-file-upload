<template>
  <div class="file-upload"
    :class="computedClasses"
    @drag.stop.prevent=""
    @dragover.stop.prevent=""
    @dragstart.stop.prevent="startDrag"
    @dragenter.stop.prevent="startDrag"
    @dragend.stop.prevent="stopDrag"
    @dragleave.stop.prevent="stopDrag"
    @drop.stop.prevent="handleDrop"
    @click="chooseFiles">

    <input v-el:file-input type="file" v-model="files" @change="handleFiles">
    <button v-show="uploadingFiles.length === 0" v-text="buttonText"></button>

    <div class="uploading-files">
      <div class="uploading-file" v-for="file in uploadingFiles"
        :class="{
          incomplete: file.progress.status === 'incomplete',
          complete: file.progress.status === 'complete',
          error: file.progress.status === 'error'
        }">
        <span class="name" v-text="file.name"></span>
        <progress :value="file.progress.loaded" :max="file.progress.total"></progress>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data () {
    return {
      draggingOver: false,
      uploadingFiles: []
    }
  },
  computed: {
    computedClasses () {
      let classObject = {}
      classObject[this.draggingClass] = this.draggingOver
      return classObject
    },
    canDragAndDrop () {
      const div = document.createElement('div')
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
    }
  },
  props: {
    files: {
      twoWay: true
    },
    dragOverMethod: {
      type: Function
    },
    draggingClass: {
      type: String,
      default: 'dragging-over'
    },
    filesHandler: {
      type: Function,
      default (files) {
        return this.defaultFilesHandler(files)
      }
    },
    fileHandler: {
      type: Function,
      default (file) {
        return this.defaultFileHandler(file)
      }
    },
    fileCompleteHandler: {
      type: Function,
      default (e, file) {
        return this.defaultFileCompleteHandler(e, file)
      }
    },
    filesCompleteHandler: {
      type: Function,
      default (e) {
        return this.defaultFilesCompleteHandler(e)
      }
    },
    progressHandler: {
      type: Function,
      default (e, file) {
        return this.defaultProgressHandler(e, file)
      }
    },
    fileFailedHandler: {
      type: Function,
      default (e, file) {
        return this.defaultFileFailedHandler(e, file)
      }
    },
    uploadEndpoint: {
      type: String
    },
    uploadOptions: {
      type: Object,
      default: () => ({})
    },
    buttonText: {
      type: String,
      default: 'Upload File'
    },
    fileKey: {
      type: String
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    startDrag () {
      if (!this.canDragAndDrop) return
      this.draggingOver = true
    },
    stopDrag () {
      if (!this.canDragAndDrop) return
      this.draggingOver = false
    },
    chooseFiles () {
      this.$els.fileInput.click()
    },
    handleDrop (e) {
      this.stopDrag()
      this.uploadingFiles = []
      const files = e.dataTransfer.files
      this.$els.fileInput.files = files
    },
    handleFiles (e) {
      const files = e.target.files
      this.filesHandler(files)
    },
    defaultFilesHandler (files) {
      if (this.debug) console.log('defaultFilesHandler', files)
      for (var i = 0; i < files.length; i++) {
        ((file) => {
          this.fileHandler(file)
            .then((e) => {
              this.fileCompleteHandler(e, file)
            })
            .catch((e) => {
              this.fileFailedHandler(e, file)
            })
        })(files[i])
      }
    },
    defaultFileHandler (file) {
      if (typeof this.$http !== 'undefined') {
        if (this.debug) console.log('defaultFileHandler (using vue-resource)', file)

        let data = new window.FormData()
        data.append(this.fileKey, file)
        const options = Object.assign(this.uploadOptions, {
          progress: (e) => {
            this.progressHandler(e, file)
          }
        })
        console.log(options)
        this.uploadingFiles.push({
          name: file.name,
          progress: {
            loaded: 0,
            total: file.size,
            status: 'incomplete'
          }
        })
        return this.$http.post(this.uploadEndpoint, data, options)
      }
      if (this.debug) console.log('defaultFileHandler (no vue-resource)', file)

      return
    },
    defaultProgressHandler (e, file) {
      if (this.debug) console.log('defaultProgressHandler', e)
      let thisFile = this.uploadingFiles.find(f => f.name === file.name)
      thisFile.progress.loaded = e.loaded
      thisFile.progress.total = e.total
    },
    defaultFileCompleteHandler (e, file) {
      if (this.debug) console.log('defaultFileCompleteHandler', e)
      this.uploadingFiles.find(f => f.name === file.name).progress.status = 'complete'

      if (this.uploadingFiles.filter(f => f.progress.status !== 'complete').length === 0) {
        this.filesCompleteHandler()
      }
    },
    defaultFilesCompleteHandler (e) {
      if (this.debug) console.log('defaultFilesCompleteHandler', e)
    },
    defaultFileFailedHandler (e, file) {
      if (this.debug) console.log('defaultFileFailedHandler', e)
      this.uploadingFiles.find(f => f.name === file.name).progress.status = 'error'
    }
  }
}
</script>

<style scoped>
input[type=file] {
  display: none;
}
</style>