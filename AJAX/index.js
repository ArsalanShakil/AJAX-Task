"use strict";

const form = document.querySelector("#search-form");
const input = document.querySelector('[name = "search-bar"]');
const body = document.querySelector("body");

const doFetch = async (searchValue) => {
    try {
        const response = await fetch(
            `https://api.tvmaze.com/search/shows?q= ${searchValue}`
        );
        if (response.ok) {
            const data = await response.json();
            const arrayLength = data.length;
            console.log(data.length);
            console.log(data[0]);

            for (let loop = 0; loop < arrayLength; loop++) {
                console.log(data[loop]);

                const img =
                    data[loop].show.image == null ? "http://placekitten.com/g/200/300" : data[loop].show.image.medium;

                body.innerHTML += `
            <article>
              <h2>Name: ${data[loop].show.name}</h2>
              <img src="${img}" alt="Content Image"/><br>
              <a href="${data[loop].show.officialSite}">home page</a>
              <p> Description: ${data[loop].show.summary}</p>
            </article >
            `;
            }

        } else {
            console.log("data not accessing");
        }
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputVal = input.value;
    doFetch(inputVal);
});