require('./extract_modules.js');

const { CodeBlockParser, MarkdownParser } = require('./extracted_modules.js');

console.log('\n\x1b[1m========================================\x1b[0m');
console.log('\x1b[1m   Markdown Editor 性能测试报告\x1b[0m');
console.log('\x1b[1m========================================\x1b[0m\n');

function measureTime(fn, iterations = 100) {
    const start = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = process.hrtime.bigint();
    return Number(end - start) / 1000000 / iterations;
}

const testDocuments = [
    {
        name: '短文档 (100字)',
        content: '# Hello\n\nThis is a simple test document with **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3\n\n```python\ndef hello():\n    print("Hello World")\n```\n\n[Link](https://example.com)\n\n![Image](image.png)'
    },
    {
        name: '中等文档 (1000字)',
        content: Array(10).fill('# Heading\n\nThis is a paragraph with some **bold text** and *italic text*. Here is a list:\n\n- First item\n- Second item\n- Third item\n\nHere is a code block:\n\n```javascript\nfunction test() {\n    console.log("Hello");\n    return true;\n}\n```\n\nAnd a link [here](https://example.com) and an image:\n\n![Alt](image.png)\n\n> This is a blockquote\n\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n').join('\n\n')
    },
    {
        name: '长文档 (5000字)',
        content: Array(50).fill('## Section\n\nThis is a longer paragraph with various markdown elements including **bold**, *italic*, and `inline code`. Lists:\n\n1. First item\n2. Second item\n3. Third item\n\nCode blocks:\n\n```python\nclass MyClass:\n    def __init__(self):\n        self.value = 42\n\n    def get_value(self):\n        return self.value\n```\n\nLinks and images:\n\n[Visit Example](https://example.com)\n\n![Photo](photo.jpg)\n\nBlockquotes:\n\n> Knowledge is power.\n> — Francis Bacon\n\nTables:\n\n| Name | Age | City |\n|------|-----|------|\n| John | 25  | NYC  |\n| Jane | 30  | LA   |\n').join('\n\n')
    }
];

console.log('\x1b[1m1. Markdown 解析性能测试\x1b[0m');
console.log('------------------------------------------');

for (const doc of testDocuments) {
    const time = measureTime(() => MarkdownParser.parse(doc.content));
    console.log(`  ${doc.name}: \x1b[36m${time.toFixed(4)}ms\x1b[0m 平均解析时间`);
}

console.log('\n\x1b[1m2. 代码高亮性能测试\x1b[0m');
console.log('------------------------------------------');

const codeSamples = [
    { name: 'Python (50行)', code: Array(50).fill('def function(param):\n    """Docstring"""\n    result = param * 2\n    return result').join('\n'), lang: 'python' },
    { name: 'JavaScript (50行)', code: Array(50).fill('function testFunction(param) {\n    // Comment\n    const result = param * 2;\n    return result;\n}').join('\n'), lang: 'javascript' },
    { name: 'HTML (50行)', code: Array(50).fill('<div class="container">\n    <h1>Title</h1>\n    <p>Content here</p>\n</div>').join('\n'), lang: 'html' }
];

for (const sample of codeSamples) {
    const time = measureTime(() => CodeBlockParser.highlightSyntax(sample.code, sample.lang));
    console.log(`  ${sample.name}: \x1b[36m${time.toFixed(4)}ms\x1b[0m 平均高亮时间`);
}

console.log('\n\x1b[1m3. 批量处理性能测试\x1b[0m');
console.log('------------------------------------------');

const batchSize = 100;
const shortDoc = '# Test\n\nSimple content with **bold** and [link](url).\n\n```python\nprint("hello")\n```';

const batchStart = process.hrtime.bigint();
for (let i = 0; i < batchSize; i++) {
    MarkdownParser.parse(shortDoc);
}
const batchEnd = process.hrtime.bigint();
const batchTime = Number(batchEnd - batchStart) / 1000000;
console.log(`  批量解析 ${batchSize} 个短文档: \x1b[36m${batchTime.toFixed(2)}ms\x1b[0m`);
console.log(`  每秒处理能力: \x1b[33m${(batchSize / batchTime * 1000).toFixed(0)} 文档/秒\x1b[0m`);

console.log('\n\x1b[1m4. 内存占用测试\x1b[0m');
console.log('------------------------------------------');

const memoryBefore = process.memoryUsage().heapUsed;
for (let i = 0; i < 1000; i++) {
    MarkdownParser.parse(testDocuments[2].content);
    CodeBlockParser.highlightSyntax(codeSamples[0].code, 'python');
}
const memoryAfter = process.memoryUsage().heapUsed;
const memoryUsed = (memoryAfter - memoryBefore) / 1024 / 1024;
console.log(`  处理1000次长文档后的内存增长: \x1b[33m${memoryUsed.toFixed(2)} MB\x1b[0m`);

console.log('\n\x1b[1m========================================\x1b[0m');
console.log('\x1b[1m   性能测试完成\x1b[0m');
console.log('\x1b[1m========================================\x1b[0m\n');
