// ステータス表示関数
function showStatus(message, isSuccess = true) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${isSuccess ? 'success' : 'error'}`;
    
    setTimeout(() => {
        status.classList.add('hidden');
    }, 2000);
}

// HTMLエスケープ関数（タイトルに < > " & が含まれている場合の対策）
function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// <a>タグ生成関数
function createLinkTag(title, url) {
    return `<a href="${url}">${escapeHtml(title)}</a>`;
}

// ---------------------------------------------------------
// 現在のタブ
// ---------------------------------------------------------

// URLのみ
document.getElementById('copyCurrentUrl').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await navigator.clipboard.writeText(tab.url);
        showStatus('現在のタブのURLをコピーしました！');
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});

// タイトル + URL
document.getElementById('copyCurrentTitleUrl').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const content = `${tab.title}\n${tab.url}`;
        await navigator.clipboard.writeText(content);
        showStatus('現在のタブの情報をコピーしました！');
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});

// HTMLタグ
document.getElementById('copyCurrentHtml').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const content = createLinkTag(tab.title, tab.url);
        await navigator.clipboard.writeText(content);
        showStatus('<a>タグ形式でコピーしました！');
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});


// ---------------------------------------------------------
// 現在のウィンドウ
// ---------------------------------------------------------

// URLのみ
document.getElementById('copyWindowUrls').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const urls = tabs.map(tab => tab.url).join('\n');
        await navigator.clipboard.writeText(urls);
        showStatus(`${tabs.length}個のタブのURLをコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});

// タイトル + URL
document.getElementById('copyWindowTitleUrls').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const titleAndUrls = tabs.map(tab => `${tab.title}\n${tab.url}`).join('\n\n');
        await navigator.clipboard.writeText(titleAndUrls);
        showStatus(`${tabs.length}個のタブの情報をコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});

// HTMLタグ
document.getElementById('copyWindowHtml').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const htmlTags = tabs.map(tab => createLinkTag(tab.title, tab.url)).join('\n');
        await navigator.clipboard.writeText(htmlTags);
        showStatus(`${tabs.length}個のタブを<a>タグでコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});


// ---------------------------------------------------------
// すべてのウィンドウ
// ---------------------------------------------------------

// URLのみ
document.getElementById('copyAllUrls').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({});
        const urls = tabs.map(tab => tab.url).join('\n');
        await navigator.clipboard.writeText(urls);
        showStatus(`全${tabs.length}個のタブのURLをコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});

// タイトル + URL
document.getElementById('copyAllTitleUrls').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({});
        const titleAndUrls = tabs.map(tab => `${tab.title}\n${tab.url}`).join('\n\n');
        await navigator.clipboard.writeText(titleAndUrls);
        showStatus(`全${tabs.length}個のタブの情報をコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});

// HTMLタグ
document.getElementById('copyAllHtml').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({});
        const htmlTags = tabs.map(tab => createLinkTag(tab.title, tab.url)).join('\n');
        await navigator.clipboard.writeText(htmlTags);
        showStatus(`全${tabs.length}個のタブを<a>タグでコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗:', error);
        showStatus('コピーに失敗しました', false);
    }
});