import { restaurantlist } from "./restaurant_list.js";

const readRestaurantAllFromJSFile = async (tag) => {
  const tempDocs = [];
  restaurantlist.forEach((doc) => {
    if (!doc.name.includes(tag) && !doc.tags.includes(tag)) {
      return;
    }
    const d = {};
    d.name = doc.name;
    d.tags = doc.tags;
    d.review = doc.review;
    tempDocs.push(d);
  });
  return tempDocs;
};

const makeSearchURL = (name) => {
  return `https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&q=${name}`;
};

const readRestaurantAll = async (tag) => {
  if (tag === undefined) {
    tag = "";
  }

  const tempDocs = await readRestaurantAllFromJSFile(tag);
  const border_colors = [
    "border-blue-400",
    "border-indigo-400",
    "border-purple-400",
    "border-pink-400",
    "border-red-400",
    "border-orange-400",
    "border-yellow-400",
    "border-green-400",
    "border-teal-400",
    "border-cyan-400",
    "border-gray-400",
  ];
  let html = `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`;
  let i = 0;
  for (const d of tempDocs) {
    const searchURL = makeSearchURL(d.name);
    i = i % border_colors.length;
    let reviewTag = "";
    if (d.review != null && d.review.length > 0) {
      reviewTag = `<a href="${d.review}" target="_blank" rel="noopener noreferrer" class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded inline-block transition-colors">리뷰</a>`;
    }
    html += `
<div class="rounded shadow overflow-hidden bg-gray-800 border-l-4 ${border_colors[i]} flex flex-col h-full">
  <div class="p-3">
    <h4 class="text-xl text-white font-semibold mb-2">
      ${d.name}
    </h4>
    <div class="flex flex-wrap gap-1.5">${d.tags
      .split(",")
      .map(
        (t) =>
          `<span class="restaurant-tag border border-gray-500 text-gray-300 hover:border-sky-400 hover:text-sky-400 px-2 py-0.5 rounded-full text-sm cursor-pointer transition-colors">${t.trim()}</span>`,
      )
      .join("")}</div>
  </div>
  <p class="text-center p-2">
    ${reviewTag}
    <a href="${searchURL}" target="_blank" rel="noopener noreferrer" class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded inline-block transition-colors">검색</a>
  </p>
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
  document.getElementById("restaurant_cnt").innerHTML = `${tempDocs.length}개`;
  document.querySelectorAll(".restaurant-tag").forEach((el) => {
    el.addEventListener("click", () => {
      const tagText = el.textContent;
      document.getElementById("search_restaurant_input").value = tagText;
      history.pushState(
        null,
        "",
        `/restaurant?q=${encodeURIComponent(tagText)}`,
      );
      readRestaurantAll(tagText);
    });
  });
};

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const restaurantAddEventListener = (initialTag = "") => {
  document
    .getElementById("search_restaurant_input")
    .addEventListener("keypress", (event) => {
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
  readRestaurantAll(initialTag);
};
