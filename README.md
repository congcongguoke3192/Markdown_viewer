# Markdown Preview

一个功能丰富的 Markdown 编辑器与实时预览工具，支持代码高亮、图片插入、文件上传、字符搜索等实用功能。

## 功能特性

- **实时预览** - 编辑内容即时渲染，所见即所得
- **代码高亮** - 支持 Python、JavaScript、TypeScript、Java、C++、Go、Rust 等多种编程语言
- **图片插入** - 支持本地上传图片，图片以 Base64 格式嵌入文档
- **文件上传** - 支持上传 .md、.txt 格式文件
- **字符搜索** - 支持大小写敏感、全字匹配搜索，高亮显示所有匹配项
- **GFM 模式** - 支持 GitHub Flavored Markdown 语法
- **自动保存** - 可配置的自动保存功能，防止内容丢失
- **多格式导出** - 支持将文档保存为 MD、TXT、HTML 三种格式
- **搜索导航** - 支持在匹配结果间快速跳转

## 安装步骤

### 方法一：直接打开

1. 下载 `markdown_preview_standalone.html` 文件
2. 双击文件在浏览器中打开即可使用

### 方法二：本地服务器（推荐用于开发）

```bash
cd Markdown_viewer-main
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js (npx)
npx serve .

# 或使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000/markdown_preview_standalone.html`

## 使用指南

### 1. 实时预览

在左侧编辑区输入 Markdown 文本，右侧预览区将实时显示渲染效果。

**支持的 Markdown 语法：**

- 标题（`#` 至 `######`）
- 粗体（`**文本**`）
- 斜体（`*文本*`）
- 代码（`` `代码` ``）
- 链接（`[文字](URL)`）
- 图片（`![alt](图片URL)`）
- 引用（`> 引用文本`）
- 列表（`- ` 或 `1. `）
- 表格
- 代码块（```` ```语言 ````）

### 2. 文件插入

点击工具栏的 **上传文件** 按钮，可将本地 Markdown 文件内容加载到编辑器中。

**操作步骤：**
1. 点击工具栏的「上传文件」按钮
2. 在文件选择对话框中选择 `.md` 或 `.txt` 文件
3. 文件内容将自动加载到编辑器中

**限制：**
- 文件大小限制：5MB
- 支持格式：.md, .txt

### 3. 图片插入

点击工具栏的 **插入图片** 按钮，可将本地图片以 Base64 格式嵌入文档。

**操作步骤：**
1. 点击工具栏的「插入图片」按钮
2. 在文件选择对话框中选择图片文件（支持 JPEG、PNG、GIF、WebP、BMP 格式）
3. 图片将以 `![image](data:image/...;base64,...)` 格式插入到编辑器光标位置
4. 预览区将自动显示插入的图片

### 4. 保存文档

点击工具栏的 **保存** 按钮，弹出保存对话框。

**操作步骤：**
1. 点击工具栏的「保存」按钮
2. 在弹出的对话框中：
   - 输入文件名（不含扩展名）
   - 选择保存格式：MD、TXT 或 HTML
3. 点击「下载」按钮开始下载

**保存格式说明：**
- **MD** - 导出为标准 Markdown 文件，保留所有格式
- **TXT** - 导出为纯文本文件
- **HTML** - 导出为完整的 HTML 文件（含样式）

### 5. 字符查找

点击工具栏的 **查找** 按钮或按 `Ctrl+F` 快捷键，打开搜索面板。

**操作步骤：**
1. 点击工具栏的「查找」按钮或按 `Ctrl+F`
2. 在搜索框中输入要查找的内容
3. 使用「上一个」「下一个」按钮在匹配结果间切换
4. 点击搜索面板右上角的 `×` 或按 `Esc` 关闭搜索

**搜索选项：**
- ☑️ 大小写敏感 - 区分大小写进行搜索
- ☑️ 全字匹配 - 仅匹配完整单词

**快捷键：**
| 快捷键 | 功能 |
|--------|------|
| `Ctrl+F` | 打开搜索面板 |
| `Enter` | 跳转到下一个匹配 |
| `Shift+Enter` | 跳转到上一个匹配 |
| `↑` / `↓` | 上一个/下一个匹配（搜索面板打开时） |
| `Esc` | 关闭搜索面板 |

### 6. GFM 模式

GFM（GitHub Flavored Markdown）模式提供更强大的 Markdown 语法支持。

**操作步骤：**
- 勾选「GFM Mode」复选框启用 GFM 模式
- 取消勾选则使用标准 Markdown 语法

### 7. 自动保存设置

点击工具栏右侧的 **设置** 按钮，可配置自动保存功能。

**设置选项：**

- **自动保存开关** - 启用/禁用自动保存
- **保存间隔** - 选择自动保存的时间间隔
  - 30 秒
  - 1 分钟
  - 2 分钟
  - 5 分钟

**状态指示：**
- 工具栏显示自动保存状态指示器
- 启用时显示绿色脉冲动画
- 禁用时显示灰色静态文字

### 8. 代码高亮

编辑器内置代码语法高亮功能，支持以下语言：

| 语言 | 关键词 |
|------|--------|
| Python | def, class, if, else, elif, for, while, return, import, from, as, try, except, finally, with, lambda, True, False, None, and, or, not, in, is, async, await |
| JavaScript | function, const, let, var, if, else, for, while, return, class, new, this, async, await, try, catch, finally, import, export, from, of, in |
| TypeScript | interface, type, enum, namespace, module, declare, abstract, implements, extends, public, private, protected, readonly, as, keyof, typeof |
| Java | public, private, protected, class, interface, extends, implements, static, final, void, int, boolean, String, if, else, for, while, return, try, catch, finally, new, this, null, true, false |
| C++ | #include, #define, int, main, return, if, else, for, while, do, switch, case, break, continue, const, static, class, public, private, protected, virtual, namespace, using, template, typename, nullptr, true, false |
| Go | func, package, import, var, const, type, struct, interface, map, if, else, for, range, switch, case, default, return, go, defer, select, make, new, nil, true, false |
| Rust | fn, let, mut, const, static, struct, enum, impl, trait, pub, mod, use, if, else, match, loop, while, for, in, return, async, await, self, Self, true, false, None, Some |

**使用代码块：**
```
'''语言
代码内容
'''
```

### 9. 表格支持

GFM 模式下支持表格语法：

```
| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |
```

渲染效果：

| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

## 快捷键汇总

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+F` | 打开搜索面板 |
| `Ctrl+S` | 保存文档 |
| `Enter` | 下一个搜索结果 |
| `Shift+Enter` | 上一个搜索结果 |
| `↑` / `↓` | 在搜索结果间导航 |
| `Esc` | 关闭弹窗/搜索面板 |

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 技术栈

- HTML5
- CSS3（Flexbox 布局）
- Vanilla JavaScript（无外部依赖）
- LocalStorage（自动保存）

## 文件结构

```
.
├── markdown_preview_standalone.html    # 主程序文件（包含 HTML、CSS、JavaScript）
├── demo                                # 测试文件夹
└── README.md   # 项目说明文档

```

## 注意事项

1. **自动保存数据存储在浏览器本地**，清除浏览器数据会导致自动保存的内容丢失
2. **图片以 Base64 格式嵌入**，会增加文件大小，但便于分享和存储
3. **大文件上传限制为 5MB**，请确保文件大小在限制范围内
4. **搜索高亮基于文本内容**，编辑后需要重新搜索

## 许可证

MIT License
