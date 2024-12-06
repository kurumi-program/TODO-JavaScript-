let todoList = [];
//新規作成の値
let newTodoTitleElem = "";
let newTodoContentElem = "";
let newTodoPersonElem = "";
let newTodoDateElem = "";
//検索の値
let searchFilterWord = "";
//ステータスの値
let optionIndex = 0;
//編集の時に使う値
let currentEditId = null;
//編集のTODOの値
let editTodoTitle = "";
let editTodoContent = "";
let editTodoPerson = "";
let editTodoDate = "";
let todoStatusTest = "";

//並び替えクリックでプルダウン表示

//タイトル、内容、担当者、期限の内容を取得する
const todoListElem = () => {
  newTodoTitleElem = document.getElementById("new-todo-title");
  newTodoContentElem = document.getElementById("new-todo-content");
  newTodoPersonElem = document.getElementById("new-todo-person");
  newTodoDateElem = document.getElementById("new-todo-date");
};

//編集のタイトル、内容、担当者、期限の内容を取得する
const todoEditListElem = () => {
  editTodoTitle = document.getElementById("edit-todo-title");
  editTodoContent = document.getElementById("edit-todo-content");
  editTodoPerson = document.getElementById("edit-todo-person");
  editTodoDate = document.getElementById("edit-todo-date");
};

//エラーメッセージの非表示
const clearErrorMessage = () => {
  //TODOの追加の時のエラー
  const newTodoErrorMessage = document.getElementById("error-message");
  newTodoErrorMessage.textContent = "";
  //TODO編集時のエラー
  const editTodoErrorMessage = document.getElementById("edit-error-message");
  editTodoErrorMessage.textContent = "";
};

//追加するTODOのモーダルを表示
const handleNewTodoModal = () => {
  //タスクの追加ボタンモーダル出現
  const addTodoButton = document.getElementById("add-todo-button");
  const newTodoModal = document.getElementById("new-todo-modal");
  addTodoButton.addEventListener("click", () => {
    newTodoModal.style.display = "block";
  });
  //タスク追加のモーダルを閉じる
  const modalClose = document.getElementById("modal-close");
  modalClose.addEventListener("click", () => {
    newTodoModal.style.display = "none";
    todoListElem();
    removeTodoInput();
    clearErrorMessage();
  });
};

//TODOの値を取得する関数
const getTodoValue = () => {
  //TODOの値の取得
  todoListElem();

  //エラーメッセージの表示
  if (
    newTodoTitleElem.value === "" ||
    newTodoPersonElem.value === "" ||
    newTodoDateElem.value === ""
  ) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "必要事項を入力してください";
    return;
  }

  //エラーメッセージを非表示する
  clearErrorMessage();
  //オブジェクト生成
  const todoObj = {
    id: Date.now(),
    todoTitle: newTodoTitleElem.value,
    todoContent: newTodoContentElem.value,
    todoPerson: newTodoPersonElem.value,
    todoDeadline: newTodoDateElem.value,
    todoStatus: 0,
  };

  //配列に格納
  todoList.push(todoObj);
};

//todoの最初の要素を削除←前のTODOが消されていないため
const removePrevTodo = () => {
  const todoElements = [
    document.getElementById("todo-list"),
    document.getElementById("todo-doing"),
    document.getElementById("todo-done"),
  ];
  todoElements.forEach((todoElement) => {
    while (todoElement.firstChild) {
      todoElement.firstChild.remove();
    }
  });
};

//TODOの追加
const appendTodoElem = () => {
  removePrevTodo();
  todoList
    .filter(
      (todo) =>
        todo.todoTitle.includes(searchFilterWord) ||
        todo.todoContent.includes(searchFilterWord) ||
        todo.todoPerson.includes(searchFilterWord)
    )
    .forEach((todo) => {
      const todoElem = document.getElementById("todo-list");
      const todoDoingElem = document.getElementById("todo-doing");
      const todoDoneElem = document.getElementById("todo-done");
      //TODOの要素の作成
      const todoLiElem = document.createElement("li");
      todoLiElem.classList.add("todo-color");
      //=== タイトルの要素を作成 ===//
      const todoTitleDivElem = document.createElement("div");
      todoTitleDivElem.classList.add("todo-list__title");
      //タイトル
      const todoTitleElem = document.createElement("h2");
      todoTitleElem.textContent = todo.todoTitle;
      //アイコン
      const todoIconDivElem = document.createElement("div");
      todoIconDivElem.classList.add("todo-list__icon");
      const todoIconIElem = document.createElement("i");
      todoIconIElem.classList.add("fa-solid", "fa-ellipsis");
      const todoDropdownDivElem = document.createElement("div");
      todoDropdownDivElem.classList.add("todo-list__dropdown");
      const todoRemoveElem = document.createElement("p");
      todoRemoveElem.textContent = "削除する";
      const todoEditElem = document.createElement("p");
      todoEditElem.textContent = "編集する";
      todoDropdownDivElem.appendChild(todoRemoveElem);
      todoDropdownDivElem.appendChild(todoEditElem);
      todoIconDivElem.appendChild(todoIconIElem);
      todoIconDivElem.appendChild(todoDropdownDivElem);
      //タイトルの親要素にアイコンとドロップダウンを入れる
      todoTitleDivElem.appendChild(todoTitleElem);
      todoTitleDivElem.appendChild(todoIconDivElem);

      //===  TODOを削除する  ===//
      todoRemoveElem.addEventListener("click", () => {
        todoList = todoList.filter((_todo) => _todo.id !== todo.id);
        appendTodoElem();
      });

      //=== 内容の要素を作成 ===//
      const todoContentElem = document.createElement("p");
      todoContentElem.classList.add("todo-list__list-text");
      todoContentElem.textContent = todo.todoContent;

      //=== 期限と担当者の要素を作成 ===//
      const todoDetailElem = document.createElement("div");
      todoDetailElem.classList.add("todo-list__list-detail");
      const todoPersonElem = document.createElement("p");
      todoPersonElem.classList.add("todo-list__list-person");
      todoPersonElem.textContent = `担当者：${todo.todoPerson}`;
      const todoDeadlineElem = document.createElement("p");
      todoDeadlineElem.classList.add("todo-list__list-deadline");
      todoDeadlineElem.textContent = `期限：${todo.todoDeadline}`;
      todoDetailElem.appendChild(todoPersonElem);
      todoDetailElem.append(todoDeadlineElem);

      //==== リストにタイトル、内容、担当者、期限を挿入 ====//
      todoLiElem.appendChild(todoTitleDivElem);
      todoLiElem.appendChild(todoContentElem);
      todoLiElem.appendChild(todoDetailElem);

      //===== TODOの追加 =====//
      //編集時のstatusによって表示を分ける
      if (todo.todoStatus === 0) {
        todoElem.appendChild(todoLiElem);
      } else if (todo.todoStatus === 1) {
        todoDoingElem.appendChild(todoLiElem);
      } else if (todo.todoStatus === 2) {
        todoDoneElem.appendChild(todoLiElem);
      }

      //=================== ここから編集 ======================//
      //ステータスの値を取得
      const selectStatusElem = document.getElementById("edit-todo-status");

      //=== TODOを編集する 編集画面の表示 ===//
      const editTodoModalElem = document.getElementById("edit-todo-modal");
      todoEditElem.addEventListener("click", () => {
        //エラーメッセージをリセット
        clearErrorMessage();
        //編集モーダルのタイトル、内容、担当者、期限の要素を取得
        todoEditListElem();
        //クリックしたものと一致するTODOを見つける
        currentEditId = todoList.find((_todo) => _todo.id === todo.id);
        //編集モーダルにクリックしたTODOの値を入れる
        editTodoTitle.value = currentEditId.todoTitle;
        editTodoContent.value = currentEditId.todoContent;
        editTodoPerson.value = currentEditId.todoPerson;
        editTodoDate.value = currentEditId.todoDeadline;
        selectStatusElem.value = currentEditId.todoStatus;

        //編集モーダル開く
        editTodoModalElem.style.display = "block";
      });
      //=== 編集画面を非表示 ===//
      const editTodoCloseElem = document.getElementById("edit-todo-close");
      editTodoCloseElem.addEventListener("click", () => {
        editTodoModalElem.style.display = "none";
      });

      //=== ステータスの内容を変更 ===//
      selectStatusElem.addEventListener("change", (e) => {
        optionIndex = e.target.selectedIndex;
      });

      const submitEditButton = document.getElementById("submit-edit");
      //===== 編集したTODOを保存 =====//
      submitEditButton.addEventListener("click", () => {
        //編集モーダルのタイトル、内容、担当者、期限の要素を取得
        todoEditListElem();
        if (
          editTodoTitle.value === "" ||
          editTodoContent.value === "" ||
          editTodoPerson.value === "" ||
          editTodoDate.value === ""
        ) {
          const errorMessage = document.getElementById("edit-error-message");
          errorMessage.textContent = "必要事項を入力してください";
          return;
        }
        todoList = todoList.map((todo) => {
          if (todo.id === currentEditId.id) {
            return {
              ...todo,
              todoTitle: editTodoTitle.value,
              todoContent: editTodoContent.value,
              todoDeadline: editTodoDate.value,
              todoPerson: editTodoPerson.value,
              todoStatus: optionIndex,
            };
          }
          return todo;
        });

        appendTodoElem();
        editTodoModalElem.style.display = "none";
      });
      //======= 編集ここまで =========//
    });
};

//===== TODOのinputを削除 =====//
const removeTodoInput = () => {
  newTodoTitleElem.value = "";
  newTodoContentElem.value = "";
  newTodoPersonElem.value = "";
  newTodoDateElem.value = "";
};

//========  ここで処理が実行されている  ========//
document.addEventListener("DOMContentLoaded", () => {
  //モーダルの表示
  handleNewTodoModal();

  //==== タブの切り替え ====//
  //タブの色変更
  const tabMenuElem = document.getElementById("tab-status-menu");
  const tabPElem = tabMenuElem.children;
  Array.from(tabPElem).forEach((tab, tabIndex) => {
    tab.addEventListener("click", () => {
      Array.from(tabPElem).forEach((t) => t.classList.remove("_todo-active"));
      tab.classList.add("_todo-active");

      //タブの切り替えでコンテンツ表示
      const todoListsElem = document.querySelectorAll(".todo-list__list");
      todoListsElem.forEach((todoList) => {
        todoList.style.display = "none";
      });
      todoListsElem[tabIndex].style.display = "block";
    });
  });

  //TODOの追加
  const newTodoButtonElem = document.getElementById("submit-new-todo");
  newTodoButtonElem.addEventListener("click", () => {
    //TODOの値を取得
    getTodoValue();
    //TODO一覧に追加
    if (todoList.length > 0) {
      appendTodoElem();
      const newTodoModal = document.getElementById("new-todo-modal");
      newTodoModal.style.display = "none";
    }
    //inputを空にする
    removeTodoInput();
  });

  //TODOの検索
  const searchTodoElem = document.getElementById("search-todo");
  searchTodoElem.addEventListener("input", () => {
    searchFilterWord = searchTodoElem.value;
    appendTodoElem();
  });

  //======= 並び替え =======//
  //カラーのリセット
  const sortResetColor = () => {
    sortDeadlineLiElem.forEach((clearSortList) => {
      clearSortList.style.background = "";
      clearSortList.style.color = "";
    });
  };
  const sortDeadlineLiElem = document.querySelectorAll(".sort-deadline");
  sortDeadlineLiElem.forEach((sortList, sortIndex) => {
    //active時の色変更
    const sortActiveColor = () => {
      sortList.style.background = "#75c5ea";
      sortList.style.color = "#fff";
    };

    sortList.addEventListener("click", () => {
      sortResetColor();
      todoList.sort((a, b) => {
        const dateA = new Date(a.todoDeadline);
        const dateB = new Date(b.todoDeadline);
        if (sortIndex === 0) {
          return dateA - dateB;
        } else if (sortIndex === 1) {
          return dateB - dateA;
        }
        return;
      });
      sortActiveColor();
      appendTodoElem();
    });

    //並び替えボタンを押した時元に戻す
    const sortAddTodo = document.getElementById("sort-add-todo");
    sortAddTodo.addEventListener("click", () => {
      sortResetColor();
      todoList.sort((a, b) => a.id - b.id);
      appendTodoElem();
    });
  });
});
