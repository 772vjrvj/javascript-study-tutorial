const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    this.classList.toggle('close');
});

const para = `<p>Lorem ipsum dolor sit amet consectetur u repellendus tenetur facere sapiente architecto molestiae ea, vel natus eveniet cum inventore facilis et ex pariatur? Earum, dolor veniam magni provident a nihil laboriosam at omnis reiciendis asperiores, expedita doloribus est ipsa rem. Id debitis error nesciunt laudantium, officia quas distinctio repudiandae consectetur laboriosam nemo veniam ipsum voluptatum.
</p>`;

let add = document.querySelector("#add"),
    remove = document.querySelector("#remove");

add.addEventListener("click", event => {
    if(event.target.previousElementSibling.nodeName === "H1" ||
        event.target.previousElementSibling.nodeName === "P"){
        event.target.previousElementSibling.insertAdjacentHTML('afterend', para);
    }
});

remove.addEventListener("click", event => {
    if(event.target.previousElementSibling.previousElementSibling.nodeName === "P"){
        event.target.previousElementSibling.previousElementSibling.remove();
    }   
});
