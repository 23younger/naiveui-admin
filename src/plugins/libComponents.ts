/**
 * 全局注册第三方库组件
 * @param app
 */
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
export function setupLibComponents(app) {
  app.use(Viewer, {
    Options: {
      inline: true,
      button: true, //右上角按钮
      navbar: true, //底部缩略图
      title: true, //当前图片标题
      toolbar: true, //底部工具栏
      tooltip: true, //显示缩放百分比
      movable: true, //是否可以移动
      zoomable: true, //是否可以缩放
      rotatable: true, //是否可旋转
      scalable: true, //是否可翻转
      transition: true, //使用 CSS3 过度
      fullscreen: true, //播放时是否全屏
      keyboard: true, //是否支持键盘
    },
  });
}
