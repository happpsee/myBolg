import {createEditor, createToolbar} from "@my-blog/editor";


let editor;
let editorTool;
export const renderEditor = () => {
    const editorConfig = {
      placeholder: '你好，创作者。这个空白的世界，正等待你用文字与代码来填充。不必追求完美，只需真诚地写下你想分享的一切 —— 你的发现、你的构建、你的故事。开始你的「纪事」第一章',
    }
    editor = createEditor({
      selector: "#editor-container",
      config: editorConfig,
    });
    editorTool = createToolbar({
      editor,
      selector: "#toolbar-container"
    })
  }
export const getEditor = () => {
    return {editor, editorTool};
  }