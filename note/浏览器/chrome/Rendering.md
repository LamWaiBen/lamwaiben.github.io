# Rendering  
chrome提供用于检测重绘的工具.

## Paint flashing 绘制闪动  
勾选后, 页面中`绿色`背景代表正在重绘的标签, 如果一直在闪烁着说明一直在重绘

## Layout Shift Regions 高亮布局变动区域(重排)  
勾选后, 页面中`蓝色`背景代表重排的标签, 可以通过修改网页大小

## Layer borders
勾选后, 页面中将会有实线标明图层的边距.  
导致图层独立的常见标签有:
- iframe
- document


## FPS meter FPS表
- 实时显示当前页面的帧率
- GPU占用内存
- GPU Raster(光栅) 的开启状态