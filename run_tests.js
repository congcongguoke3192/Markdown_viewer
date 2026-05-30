require('./extract_modules.js');

const { CodeBlockParser, MarkdownParser } = require('./extracted_modules.js');

const results = { total: 0, passed: 0, failed: 0 };

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

function runTest(name, testFn) {
    try {
        testFn();
        results.passed++;
        console.log(`  \x1b[32m✓\x1b[0m ${name}`);
        return true;
    } catch (e) {
        results.failed++;
        console.log(`  \x1b[31m✗\x1b[0m ${name}: ${e.message}`);
        return false;
    } finally {
        results.total++;
    }
}

console.log('\n\x1b[1mMarkdown Editor 测试报告\x1b[0m\n');
console.log('==========================================\n');

console.log('\x1b[1m1. Markdown 解析器测试\x1b[0m');
console.log('------------------------------------------');

runTest('标题解析 - H1', () => {
    const result = MarkdownParser.parse('# Hello World');
    assert(result.includes('<h1>'), 'Should contain h1 tag');
});

runTest('标题解析 - H2', () => {
    const result = MarkdownParser.parse('## Hello World');
    assert(result.includes('<h2>'), 'Should contain h2 tag');
});

runTest('标题解析 - H3', () => {
    const result = MarkdownParser.parse('### Hello World');
    assert(result.includes('<h3>'), 'Should contain h3 tag');
});

runTest('粗体文本解析', () => {
    const result = MarkdownParser.parse('**bold text**');
    assert(result.includes('<strong>bold text</strong>'), 'Should contain strong tag');
});

runTest('斜体文本解析', () => {
    const result = MarkdownParser.parse('*italic text*');
    assert(result.includes('<em>italic text</em>'), 'Should contain em tag');
});

runTest('链接解析', () => {
    const result = MarkdownParser.parse('[Link Text](https://example.com)');
    assert(result.includes('href='), 'Should contain href attribute');
    assert(result.includes('Link Text'), 'Should contain link text');
});

runTest('图片解析', () => {
    const result = MarkdownParser.parse('![Alt Text](image.png)');
    assert(result.includes('<img'), 'Should contain img tag');
    assert(result.includes('image.png'), 'Should contain image path');
});

runTest('代码块解析', () => {
    const result = MarkdownParser.parse('```python\nprint("hello")\n```');
    assert(result.includes('<pre><code>'), 'Should contain pre code tags');
});

runTest('引用块解析', () => {
    const result = MarkdownParser.parse('> This is a quote');
    assert(result.includes('<blockquote>'), 'Should contain blockquote tag');
});

runTest('无序列表解析', () => {
    const result = MarkdownParser.parse('- Item 1\n- Item 2');
    assert(result.includes('<ul>'), 'Should contain ul tag');
    assert(result.includes('<li>'), 'Should contain li tags');
});

runTest('有序列表解析', () => {
    const result = MarkdownParser.parse('1. First\n2. Second');
    assert(result.includes('<ol>'), 'Should contain ol tag');
    assert(result.includes('<li>'), 'Should contain li tags');
});

runTest('表格解析', () => {
    const result = MarkdownParser.parse('| Header | Header |\n| --- | --- |\n| Cell | Cell |');
    assert(result.includes('<table>'), 'Should contain table tag');
    assert(result.includes('<th>'), 'Should contain th tags');
    assert(result.includes('<td>'), 'Should contain td tags');
});

runTest('HTML转义 - script标签', () => {
    const result = MarkdownParser.parse('<script>alert("xss")</script>');
    assert(!result.includes('<script>'), 'Should escape script tags');
    assert(result.includes('&lt;'), 'Should contain escaped characters');
});

runTest('HTML转义 - onerror属性', () => {
    const result = MarkdownParser.parse('<img onerror="alert(1)">');
    assert(!result.includes('onerror=') || result.includes('&gt;'), 'Should escape or handle onerror');
});

runTest('多行段落解析', () => {
    const result = MarkdownParser.parse('Line 1\nLine 2\nLine 3');
    assert(result.includes('<p>'), 'Should contain paragraph tags');
});

runTest('内联代码解析', () => {
    const result = MarkdownParser.parse('`inline code`');
    assert(result.includes('<code>inline code</code>'), 'Should contain code tag');
});

console.log('\n\x1b[1m2. 代码高亮测试\x1b[0m');
console.log('------------------------------------------');

runTest('Python 关键字高亮', () => {
    const result = CodeBlockParser.highlightSyntax('def hello():', 'python');
    assert(result.includes('code-keyword'), 'Should highlight def keyword');
});

runTest('JavaScript 关键字高亮', () => {
    const result = CodeBlockParser.highlightSyntax('function test()', 'javascript');
    assert(result.includes('code-keyword'), 'Should highlight function keyword');
});

runTest('字符串高亮 - 双引号', () => {
    const result = CodeBlockParser.highlightSyntax('"hello world"', 'python');
    assert(result.includes('code-string'), 'Should highlight strings');
});

runTest('字符串高亮 - 单引号', () => {
    const result = CodeBlockParser.highlightSyntax("'hello world'", 'python');
    assert(result.includes('code-string'), 'Should highlight strings');
});

runTest('数字高亮 - 整数', () => {
    const result = CodeBlockParser.highlightSyntax('123', 'python');
    assert(result.includes('code-number'), 'Should highlight numbers');
});

runTest('数字高亮 - 浮点数', () => {
    const result = CodeBlockParser.highlightSyntax('3.14', 'python');
    assert(result.includes('code-number'), 'Should highlight numbers');
});

runTest('注释高亮 - Python (#)', () => {
    const result = CodeBlockParser.highlightSyntax('# comment', 'python');
    assert(result.includes('code-comment'), 'Should highlight Python comments');
});

runTest('注释高亮 - JavaScript (//)', () => {
    const result = CodeBlockParser.highlightSyntax('// comment', 'javascript');
    assert(result.includes('code-comment'), 'Should highlight JS comments');
});

runTest('注释高亮 - 块注释', () => {
    const result = CodeBlockParser.highlightSyntax('/* comment */', 'javascript');
    assert(result.includes('code-comment'), 'Should highlight block comments');
});

runTest('类名高亮', () => {
    const result = CodeBlockParser.highlightSyntax('MyClass', 'python');
    assert(result.includes('code-class'), 'Should highlight class names');
});

runTest('多行代码块处理', () => {
    const code = 'def foo():\n    print("hello")\n    return 42';
    const result = CodeBlockParser.highlightSyntax(code, 'python');
    const lines = result.split('\n').length;
    assert(lines === 3, `Should have 3 lines, got ${lines}`);
});

runTest('HTML 标签转义', () => {
    const result = CodeBlockParser.highlightSyntax('<div>content</div>', 'html');
    assert(result.includes('&lt;') || result.includes('&gt;'), 'Should escape HTML');
});

runTest('CSS 属性高亮', () => {
    const result = CodeBlockParser.highlightSyntax('color: red;', 'css');
    assert(result.includes('code-keyword') || result.includes('code-string'), 'Should highlight CSS');
});

runTest('Java public 关键字', () => {
    const result = CodeBlockParser.highlightSyntax('public class Test', 'java');
    assert(result.includes('code-keyword'), 'Should highlight Java keywords');
});

runTest('Go package 关键字', () => {
    const result = CodeBlockParser.highlightSyntax('package main', 'go');
    assert(result.includes('code-keyword'), 'Should highlight Go keywords');
});

runTest('Rust fn 关键字', () => {
    const result = CodeBlockParser.highlightSyntax('fn main()', 'rust');
    assert(result.includes('code-keyword'), 'Should highlight Rust keywords');
});

runTest('TypeScript 接口', () => {
    const result = CodeBlockParser.highlightSyntax('interface Person', 'typescript');
    assert(result.includes('code-keyword'), 'Should highlight TypeScript keywords');
});

runTest('Bash echo 命令', () => {
    const result = CodeBlockParser.highlightSyntax('echo "hello"', 'bash');
    assert(result.includes('code-keyword'), 'Should highlight Bash keywords');
});

console.log('\n\x1b[1m3. 安全测试\x1b[0m');
console.log('------------------------------------------');

runTest('XSS防护 - script注入', () => {
    const result = MarkdownParser.parse('<script>alert(1)</script>');
    assert(!result.includes('<script>'), 'Should prevent script injection');
    assert(result.includes('&lt;') || result.includes('&gt;'), 'Should escape dangerous content');
});

runTest('XSS防护 - onclick注入', () => {
    const result = MarkdownParser.parse('<img onclick="alert(1)">');
    assert(!result.includes('onclick=') || result.includes('&gt;'), 'Should escape event handlers');
});

runTest('XSS防护 - javascript:协议', () => {
    const result = MarkdownParser.parse('[Click](javascript:alert(1))');
    assert(!result.includes('javascript:alert(1)'), 'Should handle javascript protocol');
});

runTest('XSS防护 - onload注入', () => {
    const result = MarkdownParser.parse('<img onload="alert(1)">');
    assert(!result.includes('onload=') || result.includes('&gt;'), 'Should escape event handlers');
});

console.log('\n==========================================');
console.log('\n\x1b[1m测试结果汇总\x1b[0m');
console.log('------------------------------------------');
console.log(`总测试数: \x1b[34m${results.total}\x1b[0m`);
console.log(`\x1b[32m通过: ${results.passed}\x1b[0m`);
console.log(`\x1b[31m失败: ${results.failed}\x1b[0m`);

const passRate = ((results.passed / results.total) * 100).toFixed(2);
console.log(`通过率: \x1b[33m${passRate}%\x1b[0m`);

if (results.failed === 0) {
    console.log('\n\x1b[32m所有测试通过！\x1b[0m\n');
    process.exit(0);
} else {
    console.log('\n\x1b[31m存在失败的测试。\x1b[0m\n');
    process.exit(1);
}
