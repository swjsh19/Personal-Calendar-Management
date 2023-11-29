document.getElementById('new-button').addEventListener('click', () => {
    newMemo();
})
document.getElementById('save-button').addEventListener('click', () => {
    saveMemoToList();
});
document.getElementById('bold-button').addEventListener('click', () => {
    document.execCommand('bold', false, null);
});
document.getElementById('delete-button').addEventListener('click', () => {
    deleteSelectedMemo();
});

function init(){
    newMemo();
}

var savedList = JSON.parse(localStorage.getItem('memoList')) || [];
var currentMemoKey = "memoKey";
var memoListItemKeyIndex = savedList.length > 0 ? `${savedList[savedList.length-1].key}`.replace(currentMemoKey, '') : 0;
var memoList = document.getElementById('memo-list');
var selectedMemoKey = null;

savedList.forEach(function (item) {
    addListItem(item);
});

function newMemo(){
    selectedMemoKey = null;
    const memoContent = document.getElementById('memo-text-content');
    const memoTitle = document.getElementById('memo-text-title');
    memoContent.innerText = '';
    memoContent.ariaPlaceholder = '메모를 입력해주세요'
    memoTitle.innerText = '';
    document.getElementById('memo-text-create-day').innerText = getDate() + ' ' + getTime();
}

function saveMemoToList() {
    var memoTitle = document.getElementById('memo-text-title').innerHTML.trim();
    var memoContent = document.getElementById('memo-text-content').innerHTML.trim();
    var createDateTime = document.getElementById('memo-text-create-day').innerHTML.trim();

    var selectedMemo = savedList.find(function (item) {
        return item.key === selectedMemoKey;
    });
    if (memoContent !== '') {
        if (selectedMemo) {

            const cleanList = savedList.filter(function(item){
                return item.key !== selectedMemo.key;
            });

            var listItem = {
                key: selectedMemo.key,
                title: memoTitle,
                content: memoContent,
                createDateTime: selectedMemo.createDateTime,
                enterDateTime: new Date().toLocaleString()
            };
            cleanList.push(listItem);
            memoList.innerHTML = '';
            savedList = cleanList;
            savedList.forEach(function (item) {
                addListItem(item);
            });
        }
        else{
            var listItem = {
                key: currentMemoKey + ++memoListItemKeyIndex,
                title: memoTitle,
                content: memoContent,
                createDateTime: createDateTime,
                enterDateTime: new Date().toLocaleString()
            };
            selectedMemoKey = listItem.key;
            addListItem(listItem);
            savedList.push(listItem);
        }

        localStorage.setItem('memo', '');
        localStorage.setItem('memoList', JSON.stringify(savedList));

        alert('메모가 저장되었습니다.');
    } else {
        alert('메모를 입력하세요.');
    }
}

function loadMemo(item) {
    document.getElementById('memo-text-title').innerHTML = item.title;
    document.getElementById('memo-text-content').innerHTML = item.content;
    document.getElementById('memo-text-create-day').innerHTML = item.createDateTime;
}

function addListItem(item) {
    var listItem = document.createElement('li');
    listItem.className = "memo-list-item";
    var memoListTitle = item.title ? item.title : item.content;
    listItem.textContent = memoListTitle;

    listItem.addEventListener('click', function () {
        loadMemo(item);
        selectedMemoKey = item.key;
    });

    memoList.appendChild(listItem);
}

function deleteSelectedMemo() {
    if (selectedMemoKey) {
        var selectedMemo = savedList.find(function (item) {
            return item.key === selectedMemoKey;
        });

        if (selectedMemo) {
            const cleanList = savedList.filter(function(item){
                return item.key !== selectedMemo.key;
            });
            memoList.innerHTML = '';
            savedList = cleanList;
            savedList.forEach(function (item) {
                addListItem(item);
            });
            localStorage.setItem('memo', '');
            localStorage.setItem('memoList', JSON.stringify(savedList));
            newMemo();
            alert("삭제하였습니다.")
        }
    }
}

init();