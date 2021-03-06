const gr = require('grimoirejs').default;
const $ = require('jquery');
const $$ = gr('#canvas');
const editorRunable = require('./editor-runable');

const editorConfig = [
  {
    id: 'xml-editor',
    mode: 'xml',
    text: require('./sample/change-color.goml.txt'),
  },
  // {
  //   id: 'html-editor',
  //   mode: 'html',
  //   text: require('./sample/change-color.html.txt'),
  // },
  {
    id: 'js-editor',
    mode: 'javascript',
    text: require('./sample/mouse.js.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

$('#overlay').on('mousemove', $$('renderer').single().getComponent('Renderer')._mouseMoveHandler);
$('#overlay').on('mouseleave', $$('renderer').single().getComponent('Renderer')._mouseLeaveHandler);
$('#overlay').on('mouseenter', $$('renderer').single().getComponent('Renderer')._mouseEnterHandler);

editorRunable.goml('#editor-container .left .run', '.editor', editors[0]);
editorRunable.js('#editor-container .right .run', editors[1]);

const editorBuild = require('./editor-build')('#editor-container', '.editor', 1);
$$('.editor').on('build', (i) => {
  // switch (i) {
    // case 2:
    //   $(`#editor-container .wrap`).stop(true, true).animate({
    //     left: '0%',
    //   });
    //   break;
    // case 3:
    //   $(`#editor-container .wrap`).stop(true, true).animate({
    //     left: '-200%',
    //   });
    //   break;
    // default:
  editorBuild.build(i + 1);
  // }
});

let t = null;

$$('.editor').on('show', (i) => {
  t = setTimeout(() => {
    editorBuild.build(1);
  }, 1000);
});

$$('.editor').on('hide', (i) => {
  $$('.editor mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
  if (t) {
    clearTimeout(t);
  }
});
