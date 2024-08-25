import "./bootstrap.scss";
import { restaurantlist } from "./restaurant_list.js";

export const readRestaurantAllFromJSFile = async function (tag) {
  let tempDocs = [];
  restaurantlist.forEach((doc) => {
    if (
      !doc.name.includes(tag) &&
      !doc.location.includes(tag) &&
      !doc.tags.includes(tag)
    ) {
      return;
    }
    let d = {};
    d.name = doc.name;
    d.glyphicons = doc.glyphicons;
    d.location = doc.location;
    d.tags = doc.tags;
    d.review = doc.review;
    tempDocs.push(d);
  });
  return tempDocs;
};

export const makeSearchURL = function (name) {
  return (
    "https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&q=" + name
  );
};

export const readRestaurantAll = async function (tag) {
  if (tag == undefined) {
    console.log("undefined tag");
    tag = "";
  }

  let tempDocs = await readRestaurantAllFromJSFile(tag);
  let bg_colors = [
    "bg-blue",
    "bg-indigo",
    "bg-purple",
    "bg-pink",
    "bg-red",
    "bg-orange",
    "bg-yellow",
    "bg-green",
    "bg-teal",
    "bg-cyan",
    "bg-gray",
  ];
  let html = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
  let i = 0;
  for (let d of tempDocs) {
    let searchURL = makeSearchURL(d.name);
    i = i % bg_colors.length;
    let reviewTag = "";
    if (d.review != null && d.review.length > 0) {
      reviewTag = `<a href="${d.review}" target="_blank" class="btn btn-secondary border-black">리뷰</a>`;
    }
    html += `
<div class="col">
  <div class="card h-100 ${bg_colors[i]}">
    <div class="card-body">
      <h4 class="card-title">
        ${d.name}
        <i class="bi ${d.glyphicons}"></i>
      </h4>
      <p class="card-text">${d.tags}</p>
      <p class="card-text">${d.location}</p>
    </div>
    <p class="text-center">
      ${reviewTag}
      <a href="${searchURL}" target="_blank" class="btn btn-secondary border-black">검색</a>
    </p>
  </div>
</div>
`;
    i++;
  }
  html += `</div>`;
  document.getElementById("html_out").innerHTML = html;
  //for (const name of tempDocs) {
  //  //console.log("name:", name)
  //  //<button onClick="onLikeClick"  으로 하면 onLikeClick 함수를 찾지 못하는 에러가 발생한다.
  //  //따라서 다음과 같이 이벤트 리스터를 추가한다.
  //  document.getElementById(name + "_like").addEventListener("click", () => {
  //    onLikeClick(name, name + "_좋아요");
  //  });
  //  document.getElementById(name + "_dislike").addEventListener("click", () => {
  //    onDisLikeClick(name, name + "_싫어요");
  //  });
  //}
  document.getElementById("restaurant_cnt").innerHTML =
    " (결과: " + tempDocs.length + "개)";
};

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const restaurantAddEventListener = function () {
  document
    .getElementById("search_restaurant_input")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search_restaurant_button").click();
      }
    });
  document
    .getElementById("search_restaurant_button")
    .addEventListener("click", () => {
      readRestaurantAll(
        document.getElementById("search_restaurant_input").value,
      );
    });
  readRestaurantAll("");
};
