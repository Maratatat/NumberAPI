import { GetNumberDescription, GetDateDescription } from "./requests.js";
import { ChangeFavorite } from "./favorites.js"
import { GetMaxValueNumber } from "./localStorage.js"

export function handleSubmit() {
    if (current_form === 'number') {
        GetNumberDescription(number_input.value, AddListItem)
    }
    else {
        GetDateDescription(month_input.value, day_input.value, AddListItem)
    }

}

export function AddListItem(answer, focused = false, id = null) {
    const li = document.createElement("li")
    li.className = 'task'
    li.id = id != null ? id : CreateLiId()
    const text_div = document.createElement("div")
    text_div.className = 'task__field'
    text_div.style.padding = '1em'
    text_div.textContent = answer
    const buttonElement = document.createElement('button');
    buttonElement.className = 'like-button';
    buttonElement.innerHTML = `
        <div class="like-wrapper">
        <div class="ripple"></div>
            <svg class="heart" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        <div class="particles" style="--total-particles: 6">
        <div class="particle" style="--i: 1; --color: #7642F0"></div>
        <div class="particle" style="--i: 2; --color: #AFD27F"></div>
        <div class="particle" style="--i: 3; --color: #DE8F4F"></div>
        <div class="particle" style="--i: 4; --color: #D0516B"></div>
        <div class="particle" style="--i: 5; --color: #5686F2"></div>
        <div class="particle" style="--i: 6; --color: #D53EF3"></div>
        </div>
    </div>
    `;

    if (focused) {
        buttonElement.classList.add('focused')
    }
    else {
        setTimeout(() => buttonElement.classList.toggle('focused'), 100);
        setTimeout(() => buttonElement.classList.toggle('focused'), 1000);
    }

    buttonElement.addEventListener('click', function () {
        buttonElement.id += ChangeFavorite(buttonElement, answer, li.id)
        buttonElement.classList.toggle('focused')
    })

    sessionStorage.setItem(li.id, answer)

    li.append(text_div, buttonElement);
    output_ul.appendChild(li)

    DeleteItemHandler()
}

function DeleteItemHandler() {


    $('.task').each(function () {
        var lastDeletedTask;
        var $field = $(this).find('.task__field');
        var li = $(this)
        var mousedown = false;


        $field.on('mousedown', function () {
            mousedown = true;
            $field.addClass('shaking');
            setTimeout(deleteTask, 1000)
        });

        $field.on('mouseup', function () {
            mousedown = false;
            $field.removeClass('shaking');
        });

        function deleteTask() {
            if (mousedown) {
                $field.addClass('delete');
                sessionStorage.removeItem(li.attr("id"))
                lastDeletedTask = $field.text();

                setTimeout(function () {
                    $field.remove();
                }, 200);
            } else { return; }
        }

    });
}

function CreateLiId() {
    let max = GetMaxValueNumber()
    for (let index = 0; index < sessionStorage.length; index++) {
        let key = +sessionStorage.key(index)
        if (max < key) {
            max = key
        }
    }

    return max + 1;
}