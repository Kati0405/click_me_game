function getNickname() {
    let nickname = document.getElementById('nickname').value;
    if (nickname === '') {
        throw 'Empty nickname';
    } else {
        return nickname;
    }
}
function clickHandler() {
    let nickname;
    try {
        nickname = getNickname();
    } catch (err) {
        alert(err);
    }
    countClicks(nickname);
}

let bigButton = document.getElementById('big-btn');

function countClicks(nickname) {
    let count = 0;
    let t = 5000;
    bigButton.addEventListener('click', function () {
        count++;
    });
    setTimeout(function () {
        let score = { nickname: nickname, count: count };
        storeScore(score, localStorage);
        storeScore(score, sessionStorage);
        alert(`You clicked ${count} times`);
    }, t);
    return count;
}

function storeScore(score, storage) {
    let stored = JSON.parse(storage.getItem('highScore'));
    if (!stored || stored.count < score.count) {
        storage.setItem('highScore', JSON.stringify(score));
    }
}

function showSessionScore() {
    if (JSON.parse(sessionStorage.getItem('highScore'))) {
        let count = JSON.parse(sessionStorage.getItem('highScore')).count;
        alert(`Best result is: ${count}`);
    } else {
        alert(`Best result is: 0`);
    }
}

function showLocalScore() {
    if (JSON.parse(localStorage.getItem('highScore'))) {
        let nickname = JSON.parse(localStorage.getItem('highScore')).nickname;
        let count = JSON.parse(localStorage.getItem('highScore')).count;
        alert(`Best result of whole time is: ${count} by ${nickname}`);
    } else {
        alert(`Best result of all time is: 0`);
    }
}

function clearLocalStorage() {
    localStorage.clear();
    alert('Best result of all time was cleared');
}

function clearSessionStorage() {
    sessionStorage.clear();
    alert('Best result was cleared');
}
