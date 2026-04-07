// 1. 先拿到存储的数据（没有就给空数组）
let foods = JSON.parse(localStorage.getItem("foods")) || [];

// 2. 页面加载时渲染
renderList();

// 3. 添加食物
function addFood() {
    const input = document.getElementById("foodInput");
    const value = input.value.trim();

    if (value === "") return;

    foods.push(value);

    // 存进 localStorage
    localStorage.setItem("foods", JSON.stringify(foods));

    input.value = "";

    renderList();
}

// 4. 渲染列表
function renderList() {
    const list = document.getElementById("foodList");
    list.innerHTML = "";

    foods.forEach((food, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${food}
            <button onclick="deleteFood(${index})">删除</button>
        `;

        list.appendChild(li);
    });
}

// 5. 删除
function deleteFood(index) {
    foods.splice(index, 1);

    localStorage.setItem("foods", JSON.stringify(foods));

    renderList();
}

// 6. 抽盲盒（随机2个）
function drawFood() {
    if (foods.length < 2) {
        alert("至少要有2个菜！");
        return;
    }

    let firstIndex = Math.floor(Math.random() * foods.length);
    let secondIndex;

    // 确保不重复
    do {
        secondIndex = Math.floor(Math.random() * foods.length);
    } while (secondIndex === firstIndex);

    const result = document.getElementById("result");

    result.innerHTML = `
        <h2>今晚吃：</h2>
        <p>${foods[firstIndex]} 🍽️</p>
        <p>${foods[secondIndex]} 🍽️</p>
    `;
}