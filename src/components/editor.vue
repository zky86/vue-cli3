<template>
  <div class="c-editor">
    <textarea :id="id" :value="value"></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/code'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'

export default {
  name: 'base-editor',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      id: 'editor-' + new Date().getTime()
    }
  },
  mounted () {
    const self = this
    tinymce.init({
      selector: '#' + self.id,
      height: 500,
      valid_elements: '*[*]',
      extended_valid_elements: 'link[href|rel]',
      custom_elements: 'link',
      language: 'zh_CN',
      language_url: 'http://img.yi114.com/hcs/tinymce_languages/langs/zh_CN.js',
      skin: false,
      content_css: 'http://img.yi114.com/hcs/tinymce_skins/ui/oxide/content.min.css',
      content_css_cors: true,
      content_style: 'img{max-width:100%}p{margin-block-start: 0;margin-block-end: 0;}',
      plugins: 'media code preview paste link image imagetools',
      toolbar:
        'formatselect | bold italic strikethrough forecolor backcolor | link image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code preview',
      init_instance_callback: function (editor) {
        editor.on('input change undo redo', () => {
          self.$nextTick(() => {
            self.$emit('input', editor.getContent())
            self.$parent.clearValidate && self.$parent.validate()
          })
        })
      }
    })
    this.$editor = tinymce.activeEditor
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  },
  watch: {
    value (val) {
      this.$editor.getContent() !== val && this.$editor.setContent(val)
    }
  }
}
</script>

<style lang="scss">
@import '~tinymce/skins/ui/oxide/skin.min.css';

.c-editor {
  .tox-statusbar {
    display: none;
  }
}
</style>
