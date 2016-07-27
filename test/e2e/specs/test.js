// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.file-upload')
      .assert.containsText('button', 'Upload File')
      .assert.elementCount('input[type=file]', 1)
      .end()
  }
}
