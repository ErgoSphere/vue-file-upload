import Vue from 'vue'
import FileUpload from 'src/components/FileUpload'

describe('FileUpload.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><file-upload></file-upload></div>',
      components: { FileUpload }
    }).$mount()
    expect(vm.$el.querySelector('.file-upload').innerHTML).to.contain('type="file"')
  })
})
