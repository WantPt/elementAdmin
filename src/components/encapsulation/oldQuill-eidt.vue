<template>
  <div class="quilleditor">
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="change"
    >
    </quill-editor>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from "vue-quill-editor";
import { quillRedefine } from 'vue-quill-editor-upload'
export default {
  components: {
    quillEditor
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  props: {
    uploadConfig: {
      type: Object,
      default () {
        return {
          action: '',
          res: (response) => {
            console.log(response)
          }
        }
      }
    },
    content: {
      default: ''
    }
  },
  computed: {
    editorOption () {
      return quillRedefine(Object.assign(this.config, {uploadConfig: this.uploadConfig}))
    }
  },
  data () {
    return {
      config: {
        placeholder: '请输入内容',
        toolOptions: [
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['image']
        ],
      },
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val.html)
    }
  }
}
</script>
<style lang="less">
.ql-container{
  min-height: 200px;
  max-height: 800px;
  overflow-y: auto;
}
.quilleditor{
  width: 800px;
}
.ql-editor img{
  width: 90%;
  display: block;
  margin: 10px auto;
}
</style>

